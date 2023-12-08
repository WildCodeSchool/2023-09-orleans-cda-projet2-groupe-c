import { insertCategories } from './hobbies/insert-categories';
import { insertLanguages } from './languages/insert-languages';

const insertAllData = async () => {
  await insertCategories();

  await insertLanguages();
};

await insertAllData().catch((error) => {
  throw new Error(`Impossible to insert all data: ${error}`);
});
