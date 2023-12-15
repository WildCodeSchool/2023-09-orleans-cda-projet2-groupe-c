import { db } from '@app/backend-shared';

export const insertDancingHobbies = async () => {
  const result = await db
    .selectFrom('hobby_category')
    .select('id')
    .where('name', '=', 'dancing')
    .execute();

  const DANCING_ID = result[0].id;

  await db
    .insertInto('hobby')
    .values([
      {
        name: 'ballet',
        hobby_category_id: DANCING_ID,
      },
      {
        name: 'hip-hop',
        hobby_category_id: DANCING_ID,
      },
      {
        name: 'ballroom dancing',
        hobby_category_id: DANCING_ID,
      },
      {
        name: 'comtemporary dancing',
        hobby_category_id: DANCING_ID,
      },
      {
        name: 'jazz dance',
        hobby_category_id: DANCING_ID,
      },
      {
        name: 'tap dancing',
        hobby_category_id: DANCING_ID,
      },
      {
        name: 'salsa dancing',
        hobby_category_id: DANCING_ID,
      },
      {
        name: 'breakdancing',
        hobby_category_id: DANCING_ID,
      },
      {
        name: 'belly dancing',
        hobby_category_id: DANCING_ID,
      },
      {
        name: 'flamenco',
        hobby_category_id: DANCING_ID,
      },
      {
        name: 'swing dancing',
        hobby_category_id: DANCING_ID,
      },
      {
        name: 'tango',
        hobby_category_id: DANCING_ID,
      },
      {
        name: 'folk dancing',
        hobby_category_id: DANCING_ID,
      },
      {
        name: 'pole dancing',
        hobby_category_id: DANCING_ID,
      },
      {
        name: 'irish dancing',
        hobby_category_id: DANCING_ID,
      },
      {
        name: 'bhangra',
        hobby_category_id: DANCING_ID,
      },
      {
        name: 'capoeira',
        hobby_category_id: DANCING_ID,
      },
      {
        name: 'bollywood dancing',
        hobby_category_id: DANCING_ID,
      },
      {
        name: 'zumba',
        hobby_category_id: DANCING_ID,
      },
      {
        name: 'street dance',
        hobby_category_id: DANCING_ID,
      },
      {
        name: 'kizomba',
        hobby_category_id: DANCING_ID,
      },
      {
        name: 'polynesian dancing',
        hobby_category_id: DANCING_ID,
      },
    ])
    .execute();
};
