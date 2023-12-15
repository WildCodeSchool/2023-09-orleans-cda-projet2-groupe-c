import { db } from '@app/backend-shared';

export const insertCookingHobbies = async () => {
  const result = await db
    .selectFrom('hobby_category')
    .select('id')
    .where('name', '=', 'cooking')
    .execute();

  const COOKING_ID = result[0].id;

  await db
    .insertInto('hobby')
    .values([
      {
        name: 'cooking',
        hobby_category_id: COOKING_ID,
      },
      {
        name: 'baking',
        hobby_category_id: COOKING_ID,
      },
      {
        name: 'grilling',
        hobby_category_id: COOKING_ID,
      },
      {
        name: 'food styling',
        hobby_category_id: COOKING_ID,
      },
      {
        name: 'meal prepping',
        hobby_category_id: COOKING_ID,
      },
      {
        name: 'cake decorating',
        hobby_category_id: COOKING_ID,
      },
      {
        name: 'home brewing',
        hobby_category_id: COOKING_ID,
      },
      {
        name: 'cheese making',
        hobby_category_id: COOKING_ID,
      },
      {
        name: 'tasting',
        hobby_category_id: COOKING_ID,
      },
    ])
    .execute();
};
