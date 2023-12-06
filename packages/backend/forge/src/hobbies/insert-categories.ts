import { db } from '@app/backend-shared';

export const insertCategories = async () => {
  await db
    .insertInto('hobby_category')
    .values([
      {
        name: 'art',
        logo_path: '/categories-logos/categories/art.svg',
      },
      {
        name: 'cooking',
        logo_path: '/categories-logos/categories/cooking.svg',
      },
      {
        name: 'dancing',
        logo_path: '/categories-logos/categories/dancing.svg',
      },
      {
        name: 'gaming',
        logo_path: '/categories-logos/categories/gaming.svg',
      },
      {
        name: 'gardening',
        logo_path: '/categories-logos/categories/gardening.svg',
      },
      {
        name: 'music',
        logo_path: '/categories-logos/categories/music.svg',
      },
      {
        name: 'outing',
        logo_path: '/categories-logos/categories/outings.svg',
      },
      {
        name: 'photography',
        logo_path: '/categories-logos/categories/photography.svg',
      },
      {
        name: 'reading',
        logo_path: '/categories-logos/categories/reading.svg',
      },
      {
        name: 'sport',
        logo_path: '/categories-logos/categories/sports.svg',
      },
      {
        name: 'traveling',
        logo_path: '/categories-logos/categories/traveling.svg',
      },
      {
        name: 'writing',
        logo_path: '/categories-logos/categories/writing.svg',
      },
    ])
    .execute();
};
