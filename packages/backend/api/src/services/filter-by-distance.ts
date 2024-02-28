import { getDistance } from 'geolib';

import { db } from '@app/backend-shared';

import type { Users } from '@/services/users';

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
      latitude: user.city?.coordinates.x as number,
      longitude: user.city?.coordinates.y as number,
    };

    // Use getDistance from geolib to calculate the distance between two points
    const distance = getDistance(
      currentUserCoordinates,
      selectedUserCoordinates,
    );

    // Convert distance to kilometers and return the users that are in the range
    return Math.floor(distance / 1000) <= range;
  });

  return filteredUsersByDistance;
};

// Filter the users by distance
export const filteredUsersByDistance = async ({
  userId,
  users,
  range,
}: {
  userId: number;
  users: Users;
  range: number;
}) => {
  try {
    const filter = await filteredByDistance(userId, users, range);

    return filter;
  } catch {
    throw new Error('An error occurred while filtering users by distance.');
  }
};
