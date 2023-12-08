import { db } from '@app/backend-shared';

const allCategories = await db
  .selectFrom('hobby_category')
  .selectAll()
  .execute();

if (allCategories.length > 0) {
  await db.deleteFrom('hobby_category').execute();
}

const allTechnologies = await db.selectFrom('technology').selectAll().execute();

if (allTechnologies.length > 0) {
  await db.deleteFrom('technology').execute();
}

const allLanguages = await db.selectFrom('language').selectAll().execute();

if (allLanguages.length > 0) {
  await db.deleteFrom('language').execute();
}
