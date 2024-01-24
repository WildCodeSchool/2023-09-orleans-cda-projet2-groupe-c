import express from 'express';

import { db } from '@app/backend-shared';
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
  getUserId,
  checkUserId,
  getUsers,
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
  getUserId,
  checkUserId,
  getUserProfile,
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

// Update the data of the logged in user
userRouter.put(
  '/:userId/profile/update',
  getUserId,
  checkUserId,
  async (req: Request, res) => {
    try {
      const userId = req.userId as number;

      // Get the user profile data from the request body
      const { name, birthdate, gender, biography, accountGithub, cityId } =
        req.body;

      await db.transaction().execute(async (trx) => {
        // Update the user profile in the database
        await trx
          .updateTable('user')
          .set({
            name,
            birthdate,
            gender,
            biography,
            account_github: accountGithub,
            city_id: cityId,
          })
          .where('id', '=', userId)
          .executeTakeFirstOrThrow();
      });

      res.json({ success: true });
    } catch {
      res
        .status(500)
        .json({ error: 'An error occurred while updating user profile.' });
    }
  },
);

export default userRouter;
