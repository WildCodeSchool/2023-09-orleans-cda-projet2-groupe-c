import { insertCategories } from './hobbies/insert-categories';
import { insertLanguages } from './languages/insert-languages';
import { insertTechnologies } from './technologies/insert-technologies';

const insertAllData = async () => {
  await insertCategories();

  await insertTechnologies();

  await insertLanguages();
};

await insertAllData().catch((error) => {
  throw new Error(`Impossible to insert all data: ${error}`);
});
