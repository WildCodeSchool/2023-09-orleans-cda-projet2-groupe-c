import { db } from '@app/backend-shared';

export const insertSportHobbies = async () => {
  const result = await db
    .selectFrom('hobby_category')
    .select('id')
    .where('name', '=', 'sport')
    .execute();

  const SPORT_ID = result[0].id;

  await db
    .insertInto('hobby')
    .values([
      {
        name: 'football',
        hobby_category_id: SPORT_ID,
      },
      {
        name: 'basketball',
        hobby_category_id: SPORT_ID,
      },
      {
        name: 'tennis',
        hobby_category_id: SPORT_ID,
      },
      {
        name: 'swimming',
        hobby_category_id: SPORT_ID,
      },
      {
        name: 'running',
        hobby_category_id: SPORT_ID,
      },
      {
        name: 'cycling',
        hobby_category_id: SPORT_ID,
      },
      {
        name: 'volleyball',
        hobby_category_id: SPORT_ID,
      },
      {
        name: 'gymnastics',
        hobby_category_id: SPORT_ID,
      },
      {
        name: 'martial arts',
        hobby_category_id: SPORT_ID,
      },
      {
        name: 'rugby',
        hobby_category_id: SPORT_ID,
      },
      {
        name: 'golf',
        hobby_category_id: SPORT_ID,
      },
      {
        name: 'skiing',
        hobby_category_id: SPORT_ID,
      },
      {
        name: 'surfing',
        hobby_category_id: SPORT_ID,
      },
      {
        name: 'climbing',
        hobby_category_id: SPORT_ID,
      },
      {
        name: 'snowboarding',
        hobby_category_id: SPORT_ID,
      },
      {
        name: 'skateboarding',
        hobby_category_id: SPORT_ID,
      },
      {
        name: 'archery',
        hobby_category_id: SPORT_ID,
      },
      {
        name: 'horseback riding',
        hobby_category_id: SPORT_ID,
      },
      {
        name: 'table tennis',
        hobby_category_id: SPORT_ID,
      },
      {
        name: 'badminton',
        hobby_category_id: SPORT_ID,
      },
      {
        name: 'fencing',
        hobby_category_id: SPORT_ID,
      },
      {
        name: 'kayaking',
        hobby_category_id: SPORT_ID,
      },
      {
        name: 'canoeing',
        hobby_category_id: SPORT_ID,
      },
      {
        name: 'windsurfing',
        hobby_category_id: SPORT_ID,
      },
      {
        name: 'judo',
        hobby_category_id: SPORT_ID,
      },
      {
        name: 'triathlon',
        hobby_category_id: SPORT_ID,
      },
      {
        name: 'sailing',
        hobby_category_id: SPORT_ID,
      },
      {
        name: 'parkour',
        hobby_category_id: SPORT_ID,
      },
      {
        name: 'rafting',
        hobby_category_id: SPORT_ID,
      },
      {
        name: 'karate',
        hobby_category_id: SPORT_ID,
      },
      {
        name: 'taekwondo',
        hobby_category_id: SPORT_ID,
      },
    ])
    .execute();
};
