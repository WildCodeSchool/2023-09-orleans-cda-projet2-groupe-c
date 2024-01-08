import { db } from '@app/backend-shared';

const MAX_LANGUAGES_PER_USER = 6;

interface Language {
  id: number;
}

export const insertUsersLanguages = async () => {
  try {
    // Get all users id
    const users = await db
      .selectFrom('user')
      .select('id')
      .orderBy('id')
      .execute();

    // Get all languages id
    const languages: Language[] = await db
      .selectFrom('language')
      .select('id')
      .orderBy('id')
      .execute();

    // Array to store all user languages
    const userLanguages = [];

    // For each user, assign 1 to 6 random languages
    for (const user of users) {
      // Create a new set to avoid duplicate languages
      const languagesId = new Set();

      // Generate a random number between 1 and 6, this number will be the number of languages for each user
      const randomLanguageCount =
        Math.floor(Math.random() * MAX_LANGUAGES_PER_USER) + 1;

      // Loop to generate a random index for each languages par user and add to the set "languagesId"
      while (languagesId.size < randomLanguageCount) {
        // Generate a random index between 0 and the length of the languages array
        const randomIndex = Math.floor(Math.random() * languages.length);

        // Add the language id to the set
        languagesId.add(languages[randomIndex].id);
      }

      let order = 1;

      // For each languages in the set, push an object with order, user_id and language_id fields to the array "userLanguages"
      for (const languageId of languagesId) {
        userLanguages.push({
          order: order++,
          user_id: user.id,
          language_id: languageId as number,
        });
      }
    }

    // Insert all user languages
    await db.insertInto('language_user').values(userLanguages).execute();
  } catch (error) {
    throw new Error(`Impossible to insert users languages: ${String(error)}`);
  }
};
