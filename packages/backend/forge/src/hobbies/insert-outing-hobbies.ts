import { db } from '@app/backend-shared';

export const insertOutingHobbies = async () => {
  const result = await db
    .selectFrom('hobby_category')
    .select('id')
    .where('name', '=', 'outing')
    .execute();

  const OUTING_ID = result[0].id;

  await db
    .insertInto('hobby')
    .values([
      {
        name: 'camping',
        hobby_category_id: OUTING_ID,
      },
      {
        name: 'fishing',
        hobby_category_id: OUTING_ID,
      },
      {
        name: 'picknicking',
        hobby_category_id: OUTING_ID,
      },
      {
        name: 'rock climbing',
        hobby_category_id: OUTING_ID,
      },
      {
        name: 'nature walks',
        hobby_category_id: OUTING_ID,
      },
      {
        name: 'zip lining',
        hobby_category_id: OUTING_ID,
      },
      {
        name: 'paragliding',
        hobby_category_id: OUTING_ID,
      },
      {
        name: 'biking',
        hobby_category_id: OUTING_ID,
      },
      {
        name: 'mountaineering',
        hobby_category_id: OUTING_ID,
      },
      {
        name: 'metal detecting',
        hobby_category_id: OUTING_ID,
      },
      {
        name: 'party',
        hobby_category_id: OUTING_ID,
      },
      {
        name: 'bar hopping',
        hobby_category_id: OUTING_ID,
      },
      {
        name: 'restaurant',
        hobby_category_id: OUTING_ID,
      },
      {
        name: 'concert',
        hobby_category_id: OUTING_ID,
      },
      {
        name: 'festival',
        hobby_category_id: OUTING_ID,
      },
      {
        name: 'night club',
        hobby_category_id: OUTING_ID,
      },
      {
        name: 'cinema',
        hobby_category_id: OUTING_ID,
      },
      {
        name: 'karaoke',
        hobby_category_id: OUTING_ID,
      },
    ])
    .execute();
};
