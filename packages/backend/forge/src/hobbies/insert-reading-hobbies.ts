import { db } from '@app/backend-shared';

export const insertReadingHobbies = async () => {
  const result = await db
    .selectFrom('hobby_category')
    .select('id')
    .where('name', '=', 'reading')
    .execute();

  const READING_ID = result[0].id;

  await db
    .insertInto('hobby')
    .values([
      {
        name: 'book',
        hobby_category_id: READING_ID,
      },
      {
        name: 'novel',
        hobby_category_id: READING_ID,
      },
      {
        name: 'fiction',
        hobby_category_id: READING_ID,
      },
      {
        name: 'non-fiction',
        hobby_category_id: READING_ID,
      },
      {
        name: 'bestseller',
        hobby_category_id: READING_ID,
      },
      {
        name: 'paperback',
        hobby_category_id: READING_ID,
      },
      {
        name: 'e-book',
        hobby_category_id: READING_ID,
      },
      {
        name: 'audiobook',
        hobby_category_id: READING_ID,
      },
      {
        name: 'mystery',
        hobby_category_id: READING_ID,
      },
      {
        name: 'biography',
        hobby_category_id: READING_ID,
      },
      {
        name: 'science fiction',
        hobby_category_id: READING_ID,
      },
      {
        name: 'poetry',
        hobby_category_id: READING_ID,
      },
      {
        name: 'fantasy',
        hobby_category_id: READING_ID,
      },
      {
        name: 'memoir',
        hobby_category_id: READING_ID,
      },
      {
        name: 'classic literature',
        hobby_category_id: READING_ID,
      },
      {
        name: 'manga',
        hobby_category_id: READING_ID,
      },
    ])
    .execute();
};
