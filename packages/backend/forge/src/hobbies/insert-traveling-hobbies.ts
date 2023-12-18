import { db } from '@app/backend-shared';

export const insertTravelingHobbies = async () => {
  const result = await db
    .selectFrom('hobby_category')
    .select('id')
    .where('name', '=', 'traveling')
    .execute();

  const TRAVELING_ID = result[0].id;

  await db
    .insertInto('hobby')
    .values([
      {
        name: 'traveling',
        hobby_category_id: TRAVELING_ID,
      },
      {
        name: 'backpacking',
        hobby_category_id: TRAVELING_ID,
      },
      {
        name: 'sightseeing',
        hobby_category_id: TRAVELING_ID,
      },
      {
        name: 'adventure',
        hobby_category_id: TRAVELING_ID,
      },
      {
        name: 'culture',
        hobby_category_id: TRAVELING_ID,
      },
      {
        name: 'exploration',
        hobby_category_id: TRAVELING_ID,
      },
      {
        name: 'solo travel',
        hobby_category_id: TRAVELING_ID,
      },
      {
        name: 'hiking',
        hobby_category_id: TRAVELING_ID,
      },
      {
        name: 'road trip',
        hobby_category_id: TRAVELING_ID,
      },
      {
        name: 'souvenir collecting',
        hobby_category_id: TRAVELING_ID,
      },
      {
        name: 'urban exploration',
        hobby_category_id: TRAVELING_ID,
      },
    ])
    .execute();
};
