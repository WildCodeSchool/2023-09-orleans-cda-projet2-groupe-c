import express from 'express';
import * as jose from 'jose';

import { db } from '@app/backend-shared';
import type {
  ActivationCode,
  ActivationToken,
  AuthBody,
  RegisterBody,
  RegisterWithActivationCode,
} from '@app/shared';

import { tokenGenerator } from '@/utils/token-generator';

const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = 'http://localhost';

// Throw an error if the JWT_SECRET environment variable is not defined
if (JWT_SECRET === undefined) {
  throw new Error('JWT_SECRET is not defined');
}

// Encode the JWT secret
const secret = new TextEncoder().encode(JWT_SECRET);

const authRouter = express.Router();

// Route to register a new user
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

    // A cookie containing the JWT token
    res.cookie('token', jwt, {
      httpOnly: true,
      sameSite: true,
      secure: process.env.NODE_ENV === 'production',
      signed: true,
    });

    // A cookie containing the user ID
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
      return res.status(401).json({ message: 'Token is not valid', error });
    }

    return res.json({ ok: true });
  } catch (error) {
    return res.json({ error });
  }
});

// Route to validate the activation code
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
    return res.json({ error });
  }
});

// Route to get the user's activation code from the database
authRouter.get('/registration/users/code', async (req, res) => {
  const userId = req.signedCookies.userId;

  const code = await db
    .selectFrom('user')
    .select('activation_code')
    .where('id', '=', userId)
    .execute();

  return res.json(code);
});

// Route to check the JWT token in the cookie and verify if the user is logged in
authRouter.get('/verify', async (req, res) => {
  // Get the JWT from the cookie
  const jwt: string | undefined = req.signedCookies.token;

  // If the JWT is undefined, return an error
  if (jwt === undefined) {
    return res.json({
      ok: false,
      isLoggedIn: false,
    });
  }

  try {
    // Verify the JWT
    await jose.jwtVerify(jwt, secret, {
      issuer: FRONTEND_URL,
      audience: FRONTEND_URL,
    });

    return res.json({
      ok: true,
      isLoggedIn: true,
    });
  } catch (error) {
    // If the JWT is expired
    if (error instanceof jose.errors.JWTExpired) {
      return res.json({
        ok: false,
        isLoggedIn: false,
      });
    }

    return res.json({
      ok: false,
      isLoggedIn: false,
      error,
    });
  }
});

// Route to login a user
authRouter.post('/login', async (req, res) => {
  // Extract the email and password from the request body
  const { email, password } = req.body as AuthBody;

  try {
    // Get the user from the database
    const user = await db
      .selectFrom('user')
      .select(['user.password'])
      .where('user.email', '=', email)
      .executeTakeFirst();

    // If the user doesn't exist, return an error
    if (user === undefined) {
      return res.json({
        ok: false,
        email: 'User does not exist',
        isLoggedIn: false,
      });
    }

    // Verify the password
    const isCorrectPassword = await Bun.password.verify(
      password, // password provided by the user
      user.password, // password stored in the database
      'bcrypt', // hashing algorithm used
    );

    // If the password is incorrect, return an error
    if (!isCorrectPassword) {
      return res.json({
        ok: false,
        isLoggedIn: false,
      });
    }

    // Create a new JWT with the library jose
    const jwt = await new jose.SignJWT({
      sub: email,
    })
      .setProtectedHeader({
        alg: 'HS256',
      })
      .setIssuedAt()
      .setIssuer(FRONTEND_URL)
      .setAudience(FRONTEND_URL)
      .setExpirationTime('2h')
      .sign(secret);

    // Define the cookie token with the JWT
    res.cookie('token', jwt, {
      httpOnly: true, // The cookie is not accessible via JavaScript but only via HTTP(S)
      sameSite: true, // The cookie is not accessible via cross-site requests
      secure: process.env.NODE_ENV === 'production',
      signed: true,
    });

    return res.json({
      ok: true,
      isLoggedIn: isCorrectPassword,
    });
  } catch (error) {
    return res.json({
      ok: false,
      isLoggedIn: false,
      error,
    });
  }
});

export default authRouter;
