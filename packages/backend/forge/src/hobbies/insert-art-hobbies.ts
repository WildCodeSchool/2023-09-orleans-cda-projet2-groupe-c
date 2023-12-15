import { db } from '@app/backend-shared';

export const insertArtHobbies = async () => {
  const result = await db
    .selectFrom('hobby_category')
    .select('id')
    .where('name', '=', 'art')
    .execute();

  const ART_ID = result[0].id;

  await db
    .insertInto('hobby')
    .values([
      {
        name: 'drawing',
        hobby_category_id: ART_ID,
      },
      {
        name: 'painting',
        hobby_category_id: ART_ID,
      },
      {
        name: 'sculpting',
        hobby_category_id: ART_ID,
      },
      {
        name: 'calligraphy',
        hobby_category_id: ART_ID,
      },
      {
        name: 'pottery',
        hobby_category_id: ART_ID,
      },
      {
        name: 'graphic design',
        hobby_category_id: ART_ID,
      },
      {
        name: 'origami',
        hobby_category_id: ART_ID,
      },
      {
        name: 'crafting',
        hobby_category_id: ART_ID,
      },
      {
        name: 'jewelry making',
        hobby_category_id: ART_ID,
      },
      {
        name: 'woodworking',
        hobby_category_id: ART_ID,
      },
      {
        name: 'embroidery',
        hobby_category_id: ART_ID,
      },
      {
        name: 'kritting',
        hobby_category_id: ART_ID,
      },
      {
        name: 'collage making',
        hobby_category_id: ART_ID,
      },
      {
        name: 'glassblowing',
        hobby_category_id: ART_ID,
      },
      {
        name: 'mosaic art',
        hobby_category_id: ART_ID,
      },
      {
        name: 'digital art',
        hobby_category_id: ART_ID,
      },
      {
        name: 'printmaking',
        hobby_category_id: ART_ID,
      },
      {
        name: 'cartooning',
        hobby_category_id: ART_ID,
      },
      {
        name: 'street art',
        hobby_category_id: ART_ID,
      },
    ])
    .execute();
};
