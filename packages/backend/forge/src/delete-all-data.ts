import { db } from '@app/backend-shared';

const allCategories = await db
  .selectFrom('hobby_category')
  .selectAll()
  .execute();

const allTechnologies = await db.selectFrom('technology').selectAll().execute();

if (allCategories.length > 0) {
  await db.deleteFrom('hobby_category').execute();
}

if (allTechnologies.length > 0) {
  await db.deleteFrom('technology').execute();
}
