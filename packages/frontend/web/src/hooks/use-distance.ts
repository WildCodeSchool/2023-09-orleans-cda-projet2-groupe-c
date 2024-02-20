import getDistance from 'geolib/es/getDistance';
import { useEffect, useState } from 'react';

import type { UserBody } from '@app/shared';
import type { Point } from '@app/shared';

interface DistanceProps {
  userId: number | undefined;
  selectedUser: UserBody | undefined;
}

export default function useDistance({ userId, selectedUser }: DistanceProps) {
  // State coordinates of the user looged in
  const [coordinates, setCoordinates] = useState<Point>();

  // Get coordinates of the selected user
  const coordinatesSelectedUser = selectedUser?.city.coordinates;

  // State distance between the user logged in and the selected user
  const [distance, setDistance] = useState<number>(0);

  const [error, setError] = useState<string | null>();

  // Fetch coordinates of the user logged in
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchDistance = async () => {
      const res = await fetch(`/api/users/${userId}/profile`, {
        signal,
      });

      const data = await res.json();
      setCoordinates(data[0].city.coordinates);
    };

    fetchDistance().catch(() => {
      setError(`Fail to fetch distance.`);
    });

    return () => {
      controller.abort();
    };
  }, [userId]);

  // Use Geolib to calculate the distance between the user logged in and the selected user
  useEffect(() => {
    if (coordinates && coordinatesSelectedUser !== undefined) {
      const distanceInMeters = getDistance(
        {
          latitude: coordinates.x,
          longitude: coordinates.y,
        },
        {
          latitude: coordinatesSelectedUser.x,
          longitude: coordinatesSelectedUser.y,
        },
      );

      // Convert distance from meters to kilometers
      setDistance(Math.floor(Number(distanceInMeters) / 1000));
    }
  }, [coordinates, coordinatesSelectedUser]);

  return { distance, error };
}
