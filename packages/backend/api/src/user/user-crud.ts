import express from 'express';

import type { Request as ExpressRequest } from '@app/shared';

import { getUserId } from '@/middlewares/auth-handlers';
import { type Users, getUsers } from '@/middlewares/user-handlers';

interface Request extends ExpressRequest {
  usersList?: Users;
}

const userRouter = express.Router();

// Fetch a list of users without the user logged in
userRouter.get('/:userId', getUserId, getUsers, (req: Request, res) => {
  try {
    const users = req.usersList;

    res.status(200).json(users);
  } catch {
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
});

export default userRouter;
