import express from 'express';

import type { Request as ExpressRequest } from '@app/shared';

import { getUserId } from '@/middlewares/auth-handlers';
import {
  filteredUsersByDistance,
  getUserPreferences,
} from '@/middlewares/filter-handlers';
import { type Users, getUsers } from '@/middlewares/user-handlers';

interface Request extends ExpressRequest {
  userListFiltered?: Users;
}

const userRouter = express.Router();

// Fetch a list of users without the user logged in
userRouter.get(
  '/:userId',
  getUserId,
  getUserPreferences,
  getUsers,
  filteredUsersByDistance,
  (req: Request, res) => {
    try {
      const userListFiltered = req.userListFiltered;

      res.status(200).json(userListFiltered);
    } catch {
      res.status(500).json({ error: 'An error occurred while fetching users' });
    }
  },
);

export default userRouter;
