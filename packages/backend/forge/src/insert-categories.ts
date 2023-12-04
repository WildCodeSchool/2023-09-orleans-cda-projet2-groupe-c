import { db } from '@app/backend-shared';

export const insertCategories = async () => {
  await db
    .insertInto('hobby_category')
    .values([
      {
        name: 'art',
        logo_path: '/uploads/categories/art.svg',
      },
      {
        name: 'cooking',
        logo_path: '/uploads/categories/cooking.svg',
      },
      {
        name: 'dancing',
        logo_path: '/uploads/categories/dancing.svg',
      },
      {
        name: 'gaming',
        logo_path: '/uploads/categories/gaming.svg',
      },
      {
        name: 'gardening',
        logo_path: '/uploads/categories/gardening.svg',
      },
      {
        name: 'hiking',
        logo_path: '/uploads/categories/hiking.svg',
      },
      {
        name: 'music',
        logo_path: '/uploads/categories/music.svg',
      },
      {
        name: 'outings',
        logo_path: '/uploads/categories/outings.svg',
      },
      {
        name: 'photography',
        logo_path: '/uploads/categories/photography.svg',
      },
      {
        name: 'reading',
        logo_path: '/uploads/categories/reading.svg',
      },
      {
        name: 'sports',
        logo_path: '/uploads/categories/sports.svg',
      },
      {
        name: 'traveling',
        logo_path: '/uploads/categories/traveling.svg',
      },
      {
        name: 'writing',
        logo_path: '/uploads/categories/writing.svg',
      },
    ])
    .execute();
};

await insertCategories().catch((error) => {
  throw error;
});
