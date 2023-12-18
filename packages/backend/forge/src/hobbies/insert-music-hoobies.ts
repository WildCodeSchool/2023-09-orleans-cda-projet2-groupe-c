import { db } from '@app/backend-shared';

export const insertMusicHobbies = async () => {
  const result = await db
    .selectFrom('hobby_category')
    .select('id')
    .where('name', '=', 'music')
    .execute();

  const MUSIC_ID = result[0].id;

  await db
    .insertInto('hobby')
    .values([
      {
        name: 'singing',
        hobby_category_id: MUSIC_ID,
      },
      {
        name: 'guitar',
        hobby_category_id: MUSIC_ID,
      },
      {
        name: 'piano',
        hobby_category_id: MUSIC_ID,
      },
      {
        name: 'violin',
        hobby_category_id: MUSIC_ID,
      },
      {
        name: 'drums',
        hobby_category_id: MUSIC_ID,
      },
      {
        name: 'bass guitar',
        hobby_category_id: MUSIC_ID,
      },
      {
        name: 'songwriting',
        hobby_category_id: MUSIC_ID,
      },
      {
        name: 'music theory',
        hobby_category_id: MUSIC_ID,
      },
      {
        name: 'flute',
        hobby_category_id: MUSIC_ID,
      },
      {
        name: 'saxophone',
        hobby_category_id: MUSIC_ID,
      },
      {
        name: 'choir',
        hobby_category_id: MUSIC_ID,
      },
      {
        name: 'trumpet',
        hobby_category_id: MUSIC_ID,
      },
      {
        name: 'cello',
        hobby_category_id: MUSIC_ID,
      },
      {
        name: 'harp',
        hobby_category_id: MUSIC_ID,
      },
      {
        name: 'clarinet',
        hobby_category_id: MUSIC_ID,
      },
      {
        name: 'banjo',
        hobby_category_id: MUSIC_ID,
      },
      {
        name: 'ukulele',
        hobby_category_id: MUSIC_ID,
      },
      {
        name: 'music production',
        hobby_category_id: MUSIC_ID,
      },
      {
        name: 'bagpipes',
        hobby_category_id: MUSIC_ID,
      },
      {
        name: 'accordion',
        hobby_category_id: MUSIC_ID,
      },
      {
        name: 'xylophone',
        hobby_category_id: MUSIC_ID,
      },
      {
        name: 'oboe',
        hobby_category_id: MUSIC_ID,
      },
      {
        name: 'recorder',
        hobby_category_id: MUSIC_ID,
      },
      {
        name: 'tuba',
        hobby_category_id: MUSIC_ID,
      },
    ])
    .execute();
};
