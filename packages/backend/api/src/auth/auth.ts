import express from 'express';
import * as jose from 'jose';

import { db } from '@app/backend-shared';
import type { AuthBody } from '@app/shared';

const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = 'http://localhost';

// Throw an error if the JWT_SECRET environment variable is not defined
if (JWT_SECRET === undefined) {
  throw new Error('JWT_SECRET is not defined');
}

// Encode the JWT secret
const secret = new TextEncoder().encode(JWT_SECRET);

const authRouter = express.Router();

// TODO : add route to register a new user

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
    const { payload } = await jose.jwtVerify(jwt, secret, {
      issuer: FRONTEND_URL,
      audience: FRONTEND_URL,
    });

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
      .select(['user.id', 'user.password'])
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
      userId: user.id, // Add the user id to the JWT payload
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
