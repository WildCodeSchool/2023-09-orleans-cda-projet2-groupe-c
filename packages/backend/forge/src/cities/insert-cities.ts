// Json file with cities from API's gouv
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

import cities from '../data/cities.json';

export const insertCities = async () => {
  // Verify that cities is an array
  if (!Array.isArray(cities)) {
    throw new TypeError('Cities must be an array');
  }

  await db
    .insertInto('city')
    .values(
      cities.map((city) => {
        return {
          name: city.nom,
          coordinates: sql`POINT(${city.centre.coordinates[0]}, ${city.centre.coordinates[1]})`,
        };
      }),
    )
    .execute();
};
