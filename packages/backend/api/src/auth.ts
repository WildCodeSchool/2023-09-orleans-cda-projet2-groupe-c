import express from 'express';
import * as jose from 'jose';

import { db } from '@app/backend-shared';
import type {
  ActivationCode,
  ActivationToken,
  RegisterBody,
  RegisterWithActivationCode,
} from '@app/types';

import { tokenGenerator } from './utils/token-generator';

// In this file we handle the registration process and the activation code validation
// it is displayed to the user as a captcha, he has to type it in a form input in order to validate his account

const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = 'http://localhost';

if (JWT_SECRET === undefined) {
  throw new Error('JWT_SECRET is not defined');
}

const secret = new TextEncoder().encode(JWT_SECRET);
const authRouter = express.Router();

authRouter.post('/registration', async (req, res) => {
  try {
    const activationCode = tokenGenerator(); // Generating random uppercased code with 6 characters and numbers

    // Getting email and password from request body, followed by password hashing
    const { email, password } = req.body as RegisterBody;

    const hashedPassword = await Bun.password.hash(password, {
      algorithm: 'bcrypt',
      cost: 10,
    });

    // Creating user object with the data from request body
    const user: RegisterWithActivationCode = {
      email,
      password: hashedPassword,
      role: 'user',
      activation_code: activationCode,
      email_verified_at: new Date(),
    };

    const result = await db.insertInto('user').values(user).execute();

    const userId = result[0].insertId;

    // Creating JWT token with Jose library
    const jwt = await new jose.SignJWT({ sub: email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setIssuer(FRONTEND_URL)
      .setAudience(FRONTEND_URL)
      .setExpirationTime('2h')
      .sign(secret);

    res.cookie('token', jwt, {
      httpOnly: true,
      sameSite: true,
      secure: process.env.NODE_ENV === 'production',
      signed: true,
    });

    // A cookie containing the user ID so we can use it to retrieve the activation code corresponding to the user
    res.cookie('userId', userId, {
      httpOnly: true,
      sameSite: true,
      secure: process.env.NODE_ENV === 'production',
      signed: true,
    });

    try {
      await jose.jwtVerify(jwt, secret, {
        issuer: FRONTEND_URL,
        audience: FRONTEND_URL,
      });
    } catch (error) {
      res.status(401).json({ message: 'Token is not valid', error });
    }

    return res.json({ ok: true });
  } catch (error) {
    return res.json({ error });
  }
});

// This route is used to validate the activation code
authRouter.post('/registration/validation', async (req, res) => {
  try {
    const userId: number = req.signedCookies.userId;
    const { activation_code: activationCode }: ActivationCode = req.body;

    const getCode = await db
      .selectFrom('user')
      .select('activation_code')
      .where('id', '=', userId)
      .execute();

    if (activationCode === getCode[0].activation_code) {
      const code: ActivationToken = {
        activation_code: '',
        activate_at: new Date(),
      };

      await db.updateTable('user').set(code).where('id', '=', userId).execute();
    }
    res.json({ ok: true });
  } catch (error) {
    throw new Error(`Error validating activation code: ${String(error)}`);
  }
});

// This route is used to retrieve the activation code from the database matching the user ID
authRouter.get('/registration/users/code', async (req, res) => {
  const userId = req.signedCookies.userId;

  const code = await db
    .selectFrom('user')
    .select('activation_code')
    .where('id', '=', userId)
    .execute();

  return res.json(code);
});

export default authRouter;
