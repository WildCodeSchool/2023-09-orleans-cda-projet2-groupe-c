import { db } from '@app/backend-shared';

export const insertWritingHobbies = async () => {
  const result = await db
    .selectFrom('hobby_category')
    .select('id')
    .where('name', '=', 'writing')
    .execute();

  const WRITING_ID = result[0].id;

  await db
    .insertInto('hobby')
    .values([
      {
        name: 'creative writing',
        hobby_category_id: WRITING_ID,
      },
      {
        name: 'journaling',
        hobby_category_id: WRITING_ID,
      },
      {
        name: 'blogging',
        hobby_category_id: WRITING_ID,
      },
      {
        name: 'scriptwriting',
        hobby_category_id: WRITING_ID,
      },
      {
        name: 'letter writing',
        hobby_category_id: WRITING_ID,
      },
      {
        name: 'songwriting',
        hobby_category_id: WRITING_ID,
      },
      {
        name: 'copywriting',
        hobby_category_id: WRITING_ID,
      },
      {
        name: 'technical writing',
        hobby_category_id: WRITING_ID,
      },
      {
        name: 'poetry writing',
        hobby_category_id: WRITING_ID,
      },
      {
        name: 'fiction writing',
        hobby_category_id: WRITING_ID,
      },
      {
        name: 'travel writing',
        hobby_category_id: WRITING_ID,
      },
      {
        name: 'content writing',
        hobby_category_id: WRITING_ID,
      },
    ])
    .execute();
};
