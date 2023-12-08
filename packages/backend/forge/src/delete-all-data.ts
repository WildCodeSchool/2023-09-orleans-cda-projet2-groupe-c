import { db } from '@app/backend-shared';

const allCategories = await db
  .selectFrom('hobby_category')
  .selectAll()
  .execute();

const allCities = await db.selectFrom('city').selectAll().execute();

if (allCategories.length > 0) {
  await db.deleteFrom('hobby_category').execute();
}

if (allCities.length > 0) {
  await db.deleteFrom('city').execute();
}

// eslint-disable-next-line unicorn/no-process-exit
process.exit(0);
