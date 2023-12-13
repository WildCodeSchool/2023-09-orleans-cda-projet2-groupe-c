import { insertCities } from './cities/insert-cities';
import { insertArtHobbies } from './hobbies/insert-art-hobbies';
import { insertCategories } from './hobbies/insert-categories';
import { insertCookingHobbies } from './hobbies/insert-cooking-hobbies';
import { insertDancingHobbies } from './hobbies/insert-dancing-hobbies';
import { insertGamingHobbies } from './hobbies/insert-gaming-hobbies';
import { insertGardeningHobbies } from './hobbies/insert-gardening-hobbies';
import { insertMusicHobbies } from './hobbies/insert-music-hoobies';
import { insertOutingHobbies } from './hobbies/insert-outing-hobbies';
import { insertPhotographyHobbies } from './hobbies/insert-photography-hobbies';
import { insertReadingHobbies } from './hobbies/insert-reading-hobbies';
import { insertSportHobbies } from './hobbies/insert-sport-hobbies';
import { insertTravelingHobbies } from './hobbies/insert-traveling-hobbies';
import { insertWritingHobbies } from './hobbies/insert-writing-hobbies';
import { insertLanguages } from './languages/insert-languages';
import { insertTechnologies } from './technologies/insert-technologies';

const insertAllData = async () => {
  try {
    await insertCategories();

    await insertArtHobbies();
    await insertCookingHobbies();
    await insertDancingHobbies();
    await insertGamingHobbies();
    await insertGardeningHobbies();
    await insertMusicHobbies();
    await insertOutingHobbies();
    await insertPhotographyHobbies();
    await insertReadingHobbies();
    await insertSportHobbies();
    await insertTravelingHobbies();
    await insertWritingHobbies();

    await insertCities();

    await insertTechnologies();

    await insertLanguages();
  } catch (error) {
    throw new Error(`Impossible to insert all data: ${String(error)}`);
  }
};

await insertAllData().catch((error) => {
  throw new Error(`Impossible to insert all data: ${error}`);
});

// eslint-disable-next-line unicorn/no-process-exit
process.exit();
