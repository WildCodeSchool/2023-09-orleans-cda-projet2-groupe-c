import express from 'express';
import * as jose from 'jose';

import { db } from '@app/backend-shared';
import type { AuthBody } from '@app/types';

const JWT_SECRET = process.env.JWT_SECRET;

// Throw an error if the JWT_SECRET environment variable is not defined
if (JWT_SECRET === undefined) {
  throw new Error('JWT_SECRET is not defined');
}

// Encode the JWT secret
const secret = new TextEncoder().encode(JWT_SECRET);

const authRouter = express.Router();

// TODO - add route to register a new user

// authRouter.post('/register', async (req, res) => {
//   const email = 'miky@gmail.com';
//   const password = 'mikexiong';

//   const hashedPassword = await Bun.password.hash(password, {
//     algorithm: 'bcrypt',
//     cost: 10,
//   });

//   const insertUsers = await db
//     .insertInto('user')
//     .values({
//       email,
//       password: hashedPassword,
//     })
//     .execute();

//   for (const insertedUser of insertUsers) {
//     console.log(insertedUser.insertId);
//   }

//   return res.json({
//     ok: true,
//   });
// });

// Route to check the JWT token in the cookie and verify if the user is logged in
authRouter.get('/check', async (req, res) => {
  // Get the JWT from the cookie
  const jwt: string | undefined = req.cookies.token;

  if (jwt === undefined) {
    return res.json({
      message: 'JWT token is not defined',
      isLoggedIn: false,
    });
  }

  try {
    // Verify the JWT
    const check = await jose.jwtVerify(jwt, secret, {
      issuer: 'http://localhost',
      audience: 'http://localhost',
    });

    console.log(check);

    return res.json({
      message: 'JWT is verify and User is connected',
      isLoggedIn: true,
    });
  } catch (error) {
    return res.json({
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
        message: 'Password is incorrect and User is not connected',
        isLoggedIn: false,
      });
    }

    // Create a new JWT
    const jwt = await new jose.SignJWT({
      sub: email,
    })
      .setProtectedHeader({
        alg: 'HS256',
      })
      .setIssuedAt()
      .setIssuer('http://localhost')
      .setAudience('http://localhost')
      .setExpirationTime('2h')
      .sign(secret);

    res.cookie('token', jwt, {
      httpOnly: true, // The cookie only accessible by the web server
      sameSite: 'lax', // The cookie is not sent with requests from other sites
      secure: process.env.NODE_ENV === 'production',
      //   signed: true,
    });

    return res.json({
      message: 'JWT is created and User is connected',
      isLoggedIn: isCorrectPassword,
    });
  } catch (error) {
    return res.json({
      isLoggedIn: false,
      error,
    });
  }
});

export default authRouter;
