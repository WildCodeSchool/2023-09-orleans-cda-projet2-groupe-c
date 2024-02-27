import express from 'express';

import type { Request } from '@app/shared';

import { getUserId } from '@/middlewares/auth-handlers';
import { filteredByAge } from '@/services/filter-by-age';
import { filteredUsersByDistance } from '@/services/filter-by-distance';
import preferences from '@/services/preferences';
import users from '@/services/users';

const userRouter = express.Router();

userRouter.get('/profile', getUserId, async (req: Request, res) => {
  try {
    // Get the user id from JWT
    const userId = req.userId as number;

    // Get the user profile with the users service
    const user = await users.getUserProfile(userId);

    res.status(200).json(user);
  } catch {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching user profile' });
  }
});

// Fetch a list of users without the user logged in
userRouter.get('/', getUserId, async (req: Request, res) => {
  try {
    // Get the user id from JWT
    const userId = req.userId as number;

    // Get the user preferences with the preferences service
    const userPreferences = await preferences.getUserPreferences(userId);

    // Get the users list with the users service
    const usersList = await users.getUsers({ userId, userPreferences });

    // Use "filteredByAge" service to filter the users by ages
    const filteredUserByAge = filteredByAge({
      users: usersList,
      minAge: userPreferences[0].min_age,
      maxAge: userPreferences[0].max_age,
    });

    // Use "filterByDistance" service to filter the users by distance
    const filteredUsers = await filteredUsersByDistance({
      userId,
      users: filteredUserByAge,
      range: userPreferences[0].distance,
    });

    res.status(200).json(filteredUsers);
  } catch {
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
});

export default userRouter;
