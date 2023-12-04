import { sql } from 'kysely';

import { db } from '@app/backend-shared';

// Json file with cities from API's gouv
import cities from './cities.json';

export const insertCities = async () => {
  // Verify that cities is an array
  if (!Array.isArray(cities)) {
    throw new TypeError('Cities must be an array');
  }

  // Loop on cities and insert in database one by one
  for (const city of cities) {
    await db
      .insertInto('city')
      .values([
        {
          name: city.nom,
          coordinates: sql`POINT(${city.centre.coordinates[0]}, ${city.centre.coordinates[1]})`,
        },
      ])
      .execute();
  }
};

await insertCities().catch((error) => {
  throw error;
});
