import { insertCities } from './cities/insert-cities';
import { insertCategories } from './hobbies/insert-categories';

const insertAllData = async () => {
  try {
    await insertCategories();

    await insertCities();
  } catch (error) {
    throw new Error(`Impossible to insert all data: ${String(error)}`);
  }
};

await insertAllData().catch((error) => {
  throw new Error(`Impossible to insert all data: ${error}`);
});

// eslint-disable-next-line unicorn/no-process-exit
process.exit();
