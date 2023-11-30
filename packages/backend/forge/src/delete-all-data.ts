import { db } from '@app/backend-shared';

const allCategories = await db
  .selectFrom('hobby_category')
  .selectAll()
  .execute();

if (allCategories.length > 0) {
  await db.deleteFrom('hobby_category').execute();
}
