import { db } from '@app/backend-shared';

export const insertGardeningHobbies = async () => {
  const result = await db
    .selectFrom('hobby_category')
    .select('id')
    .where('name', '=', 'gardening')
    .execute();

  const GARDENING_ID = result[0].id;

  await db
    .insertInto('hobby')
    .values([
      {
        name: 'gardening',
        hobby_category_id: GARDENING_ID,
      },
      {
        name: 'planting',
        hobby_category_id: GARDENING_ID,
      },
      {
        name: 'pruning',
        hobby_category_id: GARDENING_ID,
      },
      {
        name: 'watering',
        hobby_category_id: GARDENING_ID,
      },
      {
        name: 'composting',
        hobby_category_id: GARDENING_ID,
      },
      {
        name: 'harvesting',
        hobby_category_id: GARDENING_ID,
      },
      {
        name: 'landscaping',
        hobby_category_id: GARDENING_ID,
      },
      {
        name: 'mulching',
        hobby_category_id: GARDENING_ID,
      },
      {
        name: 'potting',
        hobby_category_id: GARDENING_ID,
      },
      {
        name: 'weeding',
        hobby_category_id: GARDENING_ID,
      },
      {
        name: 'transplanting',
        hobby_category_id: GARDENING_ID,
      },
      {
        name: 'fertilizing',
        hobby_category_id: GARDENING_ID,
      },
    ])
    .execute();
};
