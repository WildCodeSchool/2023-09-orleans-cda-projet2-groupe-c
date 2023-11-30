import { db } from '@app/backend-shared';

await db
  .insertInto('hobby_category')
  .values([
    {
      name: 'art',
      logo_path: 'art.svg',
    },
    {
      name: 'cooking',
      logo_path: 'cooking.svg',
    },
    {
      name: 'dancing',
      logo_path: 'dancing.svg',
    },
    {
      name: 'gaming',
      logo_path: 'gaming.svg',
    },
    {
      name: 'gardening',
      logo_path: 'gardening.svg',
    },
    {
      name: 'hiking',
      logo_path: 'hiking.svg',
    },
    {
      name: 'music',
      logo_path: 'music.svg',
    },
    {
      name: 'outings',
      logo_path: 'outings.svg',
    },
    {
      name: 'photography',
      logo_path: 'photography.svg',
    },
    {
      name: 'reading',
      logo_path: 'reading.svg',
    },
    {
      name: 'sports',
      logo_path: 'sports.svg',
    },
    {
      name: 'traveling',
      logo_path: 'traveling.svg',
    },
    {
      name: 'writing',
      logo_path: 'writing.svg',
    },
  ])
  .execute();
