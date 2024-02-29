import { db } from '@app/backend-shared';

export const insertCategories = async () => {
  await db
    .insertInto('hobby_category')
    .values([
      {
        name: 'art',
        logo_path: '/images/categories-logos/art.svg',
      },
      {
        name: 'cooking',
        logo_path: '/images/categories-logos/cooking.svg',
      },
      {
        name: 'dancing',
        logo_path: '/images/categories-logos/dancing.svg',
      },
      {
        name: 'gaming',
        logo_path: '/images/categories-logos/gaming.svg',
      },
      {
        name: 'gardening',
        logo_path: '/images/categories-logos/gardening.svg',
      },
      {
        name: 'music',
        logo_path: '/images/categories-logos/music.svg',
      },
      {
        name: 'outing',
        logo_path: '/images/categories-logos/outing.svg',
      },
      {
        name: 'photography',
        logo_path: '/images/categories-logos/photography.svg',
      },
      {
        name: 'reading',
        logo_path: '/images/categories-logos/reading.svg',
      },
      {
        name: 'sport',
        logo_path: '/images/categories-logos/sport.svg',
      },
      {
        name: 'traveling',
        logo_path: '/images/categories-logos/traveling.svg',
      },
      {
        name: 'writing',
        logo_path: '/images/categories-logos/writing.svg',
      },
    ])
    .execute();
};
