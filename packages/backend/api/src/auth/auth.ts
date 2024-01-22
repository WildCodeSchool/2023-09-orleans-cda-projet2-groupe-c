import express from 'express';
import * as jose from 'jose';

import { db } from '@app/backend-shared';
import type { Request as ExpressRequest } from '@app/shared';
import type {
  ActivationCode,
  ActivationToken,
  AuthBody,
  RegisterBody,
  RegisterWithActivationCode,
} from '@app/shared';

import { getUserId, hashPassword } from '@/middlewares/auth-handlers';
import { tokenGenerator } from '@/utils/token-generator';

const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL;

// Throw an error if the JWT_SECRET environment variable is not defined
if (JWT_SECRET === undefined) {
  throw new Error('JWT_SECRET is not defined');
}

// Encode the JWT secret
const secret = new TextEncoder().encode(JWT_SECRET);

interface Request extends ExpressRequest {
  superLikesCount?: number;
}

const authRouter = express.Router();

// Route to register a new user
authRouter.post('/registration', hashPassword, async (req, res) => {
  try {
    // Generating random uppercased code with 6 characters and numbers
    const activationCode = tokenGenerator();

    // Getting email and password from request body, followed by password hashing
    const { email, password } = req.body as RegisterBody;

    // Creating user object with the data from request body
    const data: RegisterWithActivationCode = {
      email,
      password: password,
      role: 'user',
      activation_code: activationCode,
      email_verified_at: new Date(),
    };

    // Insert new user into database
    const result = await db.insertInto('user').values(data).execute();

    // Get userId inserted
    const userId = Number(result[0].insertId);

    // Creating JWT token with Jose library
    const jwt = await new jose.SignJWT({ sub: email, userId })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setIssuer(String(FRONTEND_URL))
      .setAudience(String(FRONTEND_URL))
      .setExpirationTime('2h')
      .sign(secret);

    // A cookie containing the JWT token
    res.cookie('token', jwt, {
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
    } catch {
      return res.status(401).json({
        ok: false,
        isLoggedIn: false,
      });
    }

    return res.json({ ok: true, isLoggedIn: true });
  } catch {
    return res.json({ ok: false, isLoggedIn: false });
  }
});

// Route to validate the activation code
authRouter.post(
  '/registration/validation',
  getUserId,
  async (req: Request, res) => {
    try {
      // Get userId from the request
      const userId = req.userId as number;

      // Get the activation code from the request body
      const { activation_code: activationCode }: ActivationCode = req.body;

      // Get the activation code from the database
      const getCode = await db
        .selectFrom('user')
        .select('activation_code')
        .where('id', '=', userId)
        .execute();

      // Remove the activation code from the database and update the activation date
      if (activationCode === getCode[0].activation_code) {
        const code: ActivationToken = {
          activation_code: '',
          activate_at: new Date(),
        };

        // Update the activation code and the activation date in the database
        await db
          .updateTable('user')
          .set(code)
          .where('id', '=', userId)
          .execute();

        res.json({ ok: true, isLoggedIn: true });
      }

      res.json({ ok: false, isLoggedIn: false });
    } catch {
      return res.json({
        ok: false,
        isLoggedIn: false,
        error: 'Wrong activation code!',
      });
    }
  },
);

// Route to get the user's activation code from the database
authRouter.get(
  '/registration/users/:userId/code',
  getUserId,
  async (req: Request, res) => {
    try {
      const userId = req.userId as number;

      // Get the activation code from the database
      const code = await db
        .selectFrom('user')
        .select('activation_code')
        .where('id', '=', userId)
        .execute();

      return res.json(code);
    } catch {
      return res.json({
        error: 'An error occurred while fetching the activation code.',
      });
    }
  },
);

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
    // Verify the JWT and get the payload for getting the user id
    const { payload } = await jose.jwtVerify(jwt, secret, {
      issuer: FRONTEND_URL,
      audience: FRONTEND_URL,
    });

    // Get the user id from the payload from the JWT
    const userId = payload.userId as number;

    // Get the activation date from the database
    const user = await db
      .selectFrom('user')
      .select('activate_at')
      .where('id', '=', userId)
      .executeTakeFirst();

    // If the account is not activated, return an error
    if (!user?.activate_at) {
      return res.json({
        ok: false,
        isLoggedIn: false,
        error: 'Account not activated!',
      });
    }

    return res.json({
      ok: true,
      isLoggedIn: true,
      userId: payload.userId,
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
      .select(['user.id', 'user.password', 'activate_at'])
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

    if (!user.activate_at) {
      return res.json({
        ok: false,
        isLoggedIn: false,
        error: 'Account not activated!',
      });
    }

    // Create a new JWT with the library jose
    const jwt = await new jose.SignJWT({
      sub: email,
      userId: user.id, // Add the user id to the JWT payload
    })
      .setProtectedHeader({
        alg: 'HS256',
      })
      .setIssuedAt()
      .setIssuer(String(FRONTEND_URL))
      .setAudience(String(FRONTEND_URL))
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
