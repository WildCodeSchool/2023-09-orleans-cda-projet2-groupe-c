import { db } from '@app/backend-shared';

const MAX_LANGUAGES_PER_USER = 6;

export const insertUsersLanguages = async () => {
  // Get all users id
  const usersId = await db
    .selectFrom('user')
    .select('id')
    .orderBy('id')
    .execute();

  // Get all languages id
  const languageId = await db
    .selectFrom('language')
    .select('id')
    .orderBy('id')
    .execute();

  // Function to generate a random language id
  const randomLanguageId = () => {
    const randomIndex = Math.floor(Math.random() * languageId.length);
    return languageId[randomIndex].id;
  };

  // For each user, insert 6 random languages
  for (const userId of usersId) {
    for (let index = 0; index < MAX_LANGUAGES_PER_USER; index++) {
      await db
        .insertInto('language_user')
        .values({
          order: index + 1,
          user_id: userId.id,
          language_id: randomLanguageId(),
        })
        .execute();
    }
  }
};
