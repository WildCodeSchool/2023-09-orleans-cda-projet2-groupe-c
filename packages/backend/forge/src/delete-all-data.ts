import { db } from '@app/backend-shared';

const allCategories = await db
  .selectFrom('hobby_category')
  .selectAll()
  .execute();

const allHobbies = await db.selectFrom('hobby').selectAll().execute();

if (allCategories.length > 0) {
  await db.deleteFrom('hobby_category').execute();
}

if (allHobbies.length > 0) {
  await db.deleteFrom('hobby').execute();
}
