import { insertCategories } from './insert-categories';
import { insertCities } from './insert-cities';

const insertAllData = async () => {
  await Promise.all([insertCategories(), insertCities()]);
};

await insertAllData().catch((error) => {
  throw error;
});
