import { db } from '@app/backend-shared';

await db
  .insertInto('hobby_category')
  .values([
    {
      name: 'art',
      logo_path: '/packages/frontend/web/public/uploads/categories/art.svg',
    },
    {
      name: 'cooking',
      logo_path: '/packages/frontend/web/public/uploads/categories/cooking.svg',
    },
    {
      name: 'dancing',
      logo_path: '/packages/frontend/web/public/uploads/categories/dancing.svg',
    },
    {
      name: 'gaming',
      logo_path: '/packages/frontend/web/public/uploads/categories/gaming.svg',
    },
    {
      name: 'gardening',
      logo_path:
        '/packages/frontend/web/public/uploads/categories/gardening.svg',
    },
    {
      name: 'hiking',
      logo_path: '/packages/frontend/web/public/uploads/categories/hiking.svg',
    },
    {
      name: 'music',
      logo_path: '/packages/frontend/web/public/uploads/categories/music.svg',
    },
    {
      name: 'outings',
      logo_path: '/packages/frontend/web/public/uploads/categories/outings.svg',
    },
    {
      name: 'photography',
      logo_path:
        '/packages/frontend/web/public/uploads/categories/photography.svg',
    },
    {
      name: 'reading',
      logo_path: '/packages/frontend/web/public/uploads/categories/reading.svg',
    },
    {
      name: 'sports',
      logo_path: '/packages/frontend/web/public/uploads/categories/sports.svg',
    },
    {
      name: 'traveling',
      logo_path:
        '/packages/frontend/web/public/uploads/categories/traveling.svg',
    },
    {
      name: 'writing',
      logo_path: '/packages/frontend/web/public/uploads/categories/writing.svg',
    },
  ])
  .execute();
