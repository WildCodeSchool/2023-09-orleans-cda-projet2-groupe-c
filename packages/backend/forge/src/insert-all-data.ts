import { insertCities } from './cities/insert-cities';
import { insertCategories } from './hobbies/insert-categories';

const insertAllData = async () => {
  await insertCategories();

  await insertCities();
};

await insertAllData().catch((error) => {
  throw new Error(`Impossible to insert all data: ${error}`);
});
