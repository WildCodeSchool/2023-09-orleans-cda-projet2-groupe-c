import getDistance from 'geolib/es/getDistance';
import { useEffect, useState } from 'react';

import type { UserBody } from '@app/shared';

const API_URL = import.meta.env.VITE_API_URL;

interface CoordinatesBody {
  coordinates: number[];
}

interface DistanceProps {
  userId: number | undefined;
  selectedUser: UserBody | undefined;
}

export default function useDistance({ userId, selectedUser }: DistanceProps) {
  // State coordinates of the user looged in
  const [coordinates, setCoordinates] = useState<CoordinatesBody>();

  // Get coordinates of the selected user
  const coordinatesSelectedUser = selectedUser?.city.coordinates;

  // State distance between the user logged in and the selected user
  const [distance, setDistance] = useState<number>(0);

  // Fetch coordinates of the user logged in
  useEffect(() => {
    if (userId !== undefined) {
      const controller = new AbortController();
      const { signal } = controller;

      const fetchDistance = async () => {
        const res = await fetch(`${API_URL}/users/${userId}/profile`, {
          signal,
          credentials: 'include',
        });

        const data = await res.json();
        setCoordinates(data[0].city.coordinates);
      };

      fetchDistance().catch((error) => {
        throw new Error(`Fail to fetch distance: ${String(error)}`);
      });

      return () => {
        controller.abort();
      };
    }
  }, [userId]);

  // Use Geolib to calculate the distance between the user logged in and the selected user
  useEffect(() => {
    if (coordinates && coordinatesSelectedUser) {
      const distanceInMeters = getDistance(
        {
          latitude: coordinates.coordinates[0],
          longitude: coordinates.coordinates[1],
        },
        {
          latitude: coordinatesSelectedUser.coordinates[0],
          longitude: coordinatesSelectedUser.coordinates[1],
        },
      );

      // Convert distance from meters to kilometers
      setDistance(Math.floor(Number(distanceInMeters) / 1000));
    }
  }, [coordinates, coordinatesSelectedUser]);

  return { distance };
}
