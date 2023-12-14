import express from 'express';
import * as jose from 'jose';

import { db } from '@app/backend-shared';
import type { RegisterBody } from '@app/types';

import { tokenGenerator } from './utils/token-generator';

const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = 'http://localhost';

if (JWT_SECRET === undefined) {
  throw new Error('JWT_SECRET is not defined');
}

const secret = new TextEncoder().encode(JWT_SECRET);
const authRouter = express.Router();

authRouter.post('/registration', async (req, res) => {
  try {
    const activation_code = tokenGenerator();

    const { email, password } = req.body as RegisterBody;
    const hashedPassword = await Bun.password.hash(password, {
      algorithm: 'bcrypt',
      cost: 10,
    });
    const user: RegisterBody = {
      email,
      password: hashedPassword,
      activation_code,
      email_verified_at: new Date(),
    };

    const result = await db.insertInto('user').values(user).execute();

    const userId = result[0].insertId;

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

    return res.json({ ok: true, isLoggedIn: true });
  } catch (error) {
    return res.json({ isLoggedIn: false, error });
  }
});

authRouter.post('/registration/validation', async (req) => {
  const userId = req.signedCookies.userId;
  const code = req.body;
  const activationCode = await db
    .selectFrom('user')
    .select('activation_code')
    .where('id', '=', userId)
    .execute();

  if (code.code === activationCode[0].activation_code) {
    await db
      .updateTable('user')
      .set({ activation_code: "" })
      .where('id', '=', userId)
      .execute();
  }
});

authRouter.get('/registration/users/code', async (req, res) => {
  const userId = req.signedCookies.userId;

  const code = await db
  .selectFrom('user')
  .select('activation_code')
  .where('id', '=', userId)
  .execute();

  console.log(code);

  return res.json(code);
});

export default authRouter;
