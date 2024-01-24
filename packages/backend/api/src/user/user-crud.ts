import express from 'express';

import type { Request as ExpressRequest } from '@app/shared';

import { getUserId } from '@/middlewares/auth-handlers';
import {
  type UserProfile,
  type Users,
  checkUserId,
  getUserProfile,
  getUsers,
} from '@/middlewares/user-handlers';

interface Request extends ExpressRequest {
  userId?: number;
  usersList?: Users;
  userProfile?: UserProfile;
}

const userRouter = express.Router();

// Fetch a list of users without the user logged in
userRouter.get(
  '/:userId',
  getUserId, // Get user id from the JWT
  checkUserId, // Check if the user id is valid
  getUsers, // Fetch a list of users without the user logged in
  (req: Request, res) => {
    try {
      const users = req.usersList;

      res.status(200).json(users);
    } catch {
      res.status(500).json({ error: 'An error occurred while fetching users' });
    }
  },
);

// Get the information of the logged in user
userRouter.get(
  '/:userId/profile',
  getUserId, // Get user id from the JWT
  checkUserId, // Check if the user id is valid
  getUserProfile, // Get the data about the logged in user
  (req: Request, res) => {
    try {
      const user = req.userProfile;

      res.status(200).json(user);
    } catch {
      res
        .status(500)
        .json({ error: 'An error occurred while fetching user profile.' });
    }
  },
);

export default userRouter;
