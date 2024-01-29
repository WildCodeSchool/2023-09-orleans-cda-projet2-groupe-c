import express from 'express';
import { jsonObjectFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';
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

userRouter.get('/:userId/profile', getUserId, async (req: Request, res) => {
  try {
    const userId = req.userId as number;

    const user = await db
      .selectFrom('user')
      .innerJoin('city', 'user.city_id', 'city.id')
      .select((eb) => [
        'user.id',
        'user.name',
        jsonObjectFrom(
          eb
            .selectFrom('city')
            .select(['city.name', 'city.coordinates'])
            .whereRef('user.city_id', '=', 'city.id'),
        ).as('city'),
      ])
      .where('user.id', '=', userId)
      .execute();

    res.status(200).json(user);
  } catch {
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
});

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
