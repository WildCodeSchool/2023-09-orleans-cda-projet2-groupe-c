import type { Response } from 'express';
import getDistance from 'geolib/es/getDistance';

import { db } from '@app/backend-shared';
import type { Request as ExpressRequest } from '@app/shared';

import type { Users } from '@/middlewares/user-handlers';

export type PreferenceId = Awaited<ReturnType<typeof userPreferenceId>>;
export type PreferenceBody = Awaited<ReturnType<typeof userPreferences>>;
export type FilteredUsers = Awaited<ReturnType<typeof filteredByDistance>>;

interface Request extends ExpressRequest {
  usersList?: Users;
  userPreferenceId?: PreferenceId;
  userPreferences?: PreferenceBody;
  userListFiltered?: FilteredUsers;
}

// Get the user preference id
const userPreferenceId = async (userId: number) => {
  const result = await db
    .selectFrom('user')
    .select('preference_id')
    .where('id', '=', userId)
    .execute();

  return result;
};

// Get the user preferences
const userPreferences = async (userPreferenceId: number) => {
  const result = await db
    .selectFrom('preference')
    .selectAll()
    .where('preference.id', '=', userPreferenceId)
    .execute();

  return result;
};

// Filter the users by distance
const filteredByDistance = async (
  userId: number,
  users: Users,
  range: number,
) => {
  // Get the user logged in coordinates
  const userCoordinates = await db
    .selectFrom('user')
    .innerJoin('city as c', 'c.id', 'user.city_id')
    .select('c.coordinates')
    .where('user.id', '=', userId)
    .execute();

  const currentUserCoordinates = {
    latitude: userCoordinates[0].coordinates.x,
    longitude: userCoordinates[0].coordinates.y,
  };

  // Filter the users by distance
  const filteredUsersByDistance = users.filter((user) => {
    const selectedUserCoordinates = {
      latitude: user.city?.coordinates.coordinates[0] as number,
      longitude: user.city?.coordinates.coordinates[1] as number,
    };

    // Use getDistance from geolib to calculate the distance between two points
    const distance = getDistance(
      currentUserCoordinates,
      selectedUserCoordinates,
    );

    // Convert distance to kilometers and return the users that are in the range
    return Math.floor(distance / 1000) <= Number(range);
  });

  return filteredUsersByDistance;
};

// Get the preferences id from the user logged in
export const getUserPreferenceId = async (
  req: Request,
  res: Response,
  next: () => void,
) => {
  try {
    const userId = req.userId as number;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized!',
      });
    }

    const preferenceId = await userPreferenceId(userId);
    req.userPreferenceId = preferenceId;

    next();
  } catch {
    return res.status(500).json({
      success: false,
      error: 'Internal server error!',
    });
  }
};

// Get the preferences from the user logged in
export const getUserPreferences = async (
  req: Request,
  res: Response,
  next: () => void,
) => {
  try {
    const userPreferenceId = req.userPreferenceId;

    // Check if the user preference id is undefined
    if (!userPreferenceId || userPreferenceId[0].preference_id === undefined) {
      return res.status(401).json({
        success: false,
        error: 'User preferences not found!',
      });
    }

    const preferences = await userPreferences(
      userPreferenceId[0].preference_id,
    );

    req.userPreferences = preferences;

    next();
  } catch {
    return res.status(500).json({
      success: false,
      error: 'Internal server error!',
    });
  }
};

// Filter the users by distance
export const filteredUsersByDistance = async (
  req: Request,
  res: Response,
  next: () => void,
) => {
  try {
    const userId = req.userId as number;
    const users = req.usersList;
    const range = req.userPreferences
      ? req.userPreferences[0].distance
      : undefined;

    // Check if the user logged in is undefined
    if (users === undefined) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized!',
      });
    } else if (range === undefined) {
      return res.status(404).json({
        success: false,
        error: 'Range not defined!',
      });
    }

    const filter = await filteredByDistance(userId, users, range);
    req.userListFiltered = filter;

    next();
  } catch {
    return res.status(500).json({
      success: false,
      error: 'Internal server error!',
    });
  }
};
