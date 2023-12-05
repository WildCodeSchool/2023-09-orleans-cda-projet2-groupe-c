import { db } from '@app/backend-shared';

export const insertPhotographyHobbies = async () => {
  const result = await db
    .selectFrom('hobby_category')
    .select('id')
    .where('name', '=', 'photography')
    .execute();

  const PHOTOGRAPHY_ID = result[0].id;

  await db
    .insertInto('hobby')
    .values([
      {
        name: 'photography',
        hobby_category_id: PHOTOGRAPHY_ID,
      },
      {
        name: 'camera',
        hobby_category_id: PHOTOGRAPHY_ID,
      },
      {
        name: 'exposure',
        hobby_category_id: PHOTOGRAPHY_ID,
      },
      {
        name: 'portrait photography',
        hobby_category_id: PHOTOGRAPHY_ID,
      },
      {
        name: 'landscape photography',
        hobby_category_id: PHOTOGRAPHY_ID,
      },
      {
        name: 'composition',
        hobby_category_id: PHOTOGRAPHY_ID,
      },
    ])
    .execute();
};
