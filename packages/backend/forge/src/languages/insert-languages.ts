import { db } from '@app/backend-shared';

export const insertLanguages = async () => {
  await db
    .insertInto('language')
    .values([
      {
        name: 'css',
        logo_path: '/languages-logos/css.svg',
      },
      {
        name: 'html',
        logo_path: '/languages-logos/html.svg',
      },
      {
        name: 'java',
        logo_path: '/languages-logos/java.svg',
      },
      {
        name: 'javascript',
        logo_path: '/languages-logos/javascript.svg',
      },
      {
        name: 'gardening',
        logo_path: '/languages-logos/gardening.svg',
      },
      {
        name: 'music',
        logo_path: '/languages-logos/music.svg',
      },
      {
        name: 'outing',
        logo_path: '/languages-logos/outings.svg',
      },
      {
        name: 'photography',
        logo_path: '/languages-logos/photography.svg',
      },
      {
        name: 'reading',
        logo_path: '/languages-logos/reading.svg',
      },
      {
        name: 'sport',
        logo_path: '/languages-logos/sports.svg',
      },
      {
        name: 'traveling',
        logo_path: '/languages-logos/traveling.svg',
      },
      {
        name: 'writing',
        logo_path: '/languages-logos/writing.svg',
      },
    ])
    .execute();
};
