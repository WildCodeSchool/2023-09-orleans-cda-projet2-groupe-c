import { insertCategories } from './hobbies/insert-categories';
import { insertTechnologies } from './technologies/insert-technologies';

const insertAllData = async () => {
  await insertCategories();

  await insertTechnologies();
};

await insertAllData().catch((error) => {
  throw new Error(`Impossible to insert all data: ${error}`);
});
