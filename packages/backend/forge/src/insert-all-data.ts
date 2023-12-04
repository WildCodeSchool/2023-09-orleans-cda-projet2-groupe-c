import { insertCategories } from './insert-categories';

const insertAllData = async () => {
  await Promise.all([insertCategories()]);
};

await insertAllData().catch((error) => {
  throw error;
});
