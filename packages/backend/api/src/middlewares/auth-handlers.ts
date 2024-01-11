import type { Response } from 'express';
import * as jose from 'jose';

import type { Request } from '@app/shared';

const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = 'http://localhost';

const secret = new TextEncoder().encode(JWT_SECRET);

export const getUserId = async (
  req: Request,
  res: Response,
  next: () => void,
) => {
  // Get the JWT from the cookie
  const jwt = req.signedCookies.token;

  // If the JWT is not defined, return an error
  if (jwt === undefined) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
    });
  }

  try {
    // Verify the JWT and get the payload for getting the user id
    const { payload } = await jose.jwtVerify(jwt, secret, {
      issuer: FRONTEND_URL,
      audience: FRONTEND_URL,
    });

    // Set the userId on the request
    req.userId = payload.userId as number;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized!',
    });
  }
};
