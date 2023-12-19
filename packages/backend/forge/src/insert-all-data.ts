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
import { insertUsers } from './users/insert-users';
import { insertUsersHobbies } from './users/insert-users-hobbies';
import { insertUsersLanguages } from './users/insert-users-languages';
import { insertUsersPictures } from './users/insert-users-pictures';
import { insertUsersTechnologies } from './users/insert-users-technologies';

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

    await insertUsers();
    await insertUsersLanguages();
    await insertUsersHobbies();
    await insertUsersTechnologies();
    await insertUsersPictures('man');
    await insertUsersPictures('woman');
    await insertUsersPictures('non-binary');
  } catch (error) {
    throw new Error(`Impossible to insert all data: ${String(error)}`);
  }
};

await insertAllData().catch((error) => {
  throw new Error(`Impossible to insert all data: ${error}`);
});

// eslint-disable-next-line unicorn/no-process-exit
process.exit();
