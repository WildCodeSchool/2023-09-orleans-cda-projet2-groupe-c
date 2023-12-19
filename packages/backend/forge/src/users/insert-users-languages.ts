import { db } from '@app/backend-shared';

const MAX_LANGUAGES_PER_USER = 6;

export const insertUsersLanguages = async () => {
  try {
    // Get all users id
    const users = await db
      .selectFrom('user')
      .select('id')
      .orderBy('id')
      .execute();

    // Get all languages id
    const language = await db
      .selectFrom('language')
      .select('id')
      .orderBy('id')
      .execute();

    // Function to generate a random language id
    const randomLanguageId = () => {
      const randomIndex = Math.floor(Math.random() * language.length);
      return language[randomIndex].id;
    };

    // Array to store all user languages
    const userLanguages = [];

    // For each user, assign 6 random languages
    for (const userId of users) {
      // Generate a random number between 1 and 6, this number will be the number of languages for each user
      const languageCount =
        Math.floor(Math.random() * MAX_LANGUAGES_PER_USER) + 1;

      for (let index = 0; index < languageCount; index++) {
        userLanguages.push({
          order: index + 1,
          user_id: userId.id,
          language_id: randomLanguageId(),
        });
      }
    }

    // Insert all user languages
    await db.insertInto('language_user').values(userLanguages).execute();
  } catch (error) {
    throw new Error(`Impossible to insert users languages: ${String(error)}`);
  }
};
