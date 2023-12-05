import { db } from '@app/backend-shared';

export const insertGamingHobbies = async () => {
  const result = await db
    .selectFrom('hobby_category')
    .select('id')
    .where('name', '=', 'gaming')
    .execute();

  const GAMING_ID = result[0].id;

  await db
    .insertInto('hobby')
    .values([
      {
        name: 'esports',
        hobby_category_id: GAMING_ID,
      },
      {
        name: 'rpgs games',
        hobby_category_id: GAMING_ID,
      },
      {
        name: 'fps games',
        hobby_category_id: GAMING_ID,
      },
      {
        name: 'moba games',
        hobby_category_id: GAMING_ID,
      },
      {
        name: 'stragery games',
        hobby_category_id: GAMING_ID,
      },
      {
        name: 'sandbox games',
        hobby_category_id: GAMING_ID,
      },
      {
        name: 'adventure games',
        hobby_category_id: GAMING_ID,
      },
      {
        name: 'simulation games',
        hobby_category_id: GAMING_ID,
      },
      {
        name: 'puzzle games',
        hobby_category_id: GAMING_ID,
      },
      {
        name: 'fighting games',
        hobby_category_id: GAMING_ID,
      },
      {
        name: 'platformer games',
        hobby_category_id: GAMING_ID,
      },
      {
        name: 'racing games',
        hobby_category_id: GAMING_ID,
      },
      {
        name: 'stealth games',
        hobby_category_id: GAMING_ID,
      },
      {
        name: 'open-world games',
        hobby_category_id: GAMING_ID,
      },
      {
        name: 'battle royale games',
        hobby_category_id: GAMING_ID,
      },
      {
        name: 'mmorpg',
        hobby_category_id: GAMING_ID,
      },
      {
        name: 'survival games',
        hobby_category_id: GAMING_ID,
      },
      {
        name: 'indie games',
        hobby_category_id: GAMING_ID,
      },
      {
        name: 'virtual reality games',
        hobby_category_id: GAMING_ID,
      },
      {
        name: 'roguelike games',
        hobby_category_id: GAMING_ID,
      },
      {
        name: 'co-op games',
        hobby_category_id: GAMING_ID,
      },
    ])
    .execute();
};
