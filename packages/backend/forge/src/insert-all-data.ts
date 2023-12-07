import { insertCategories } from './hobbies/insert-categories';

const insertAllData = async () => {
  await insertCategories();
};

await insertAllData().catch((error) => {
  throw new Error(`Impossible to insert all data: ${error}`);
});
