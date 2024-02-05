import { db } from '@app/backend-shared';

enum GENDER {
  Woman = 'woman',
  Man = 'man',
  NonBinary = 'non-binary',
}

export const insertUsersPreferences = async () => {
  try {
    // Get all users id
    const users = await db
      .selectFrom('user')
      .select('id')
      .orderBy('id')
      .execute();

    // Get all languages id
    const languagesId = await db.selectFrom('language').select('id').execute();

    const preferences = [];

    // Get a random language id
    const randomLanguageId = () => {
      return languagesId[Math.floor(Math.random() * languagesId.length)].id;
    };

    const randomGender = () => {
      const genders = Object.values(GENDER);
      return genders[Math.floor(Math.random() * genders.length)];
    };

    for (const user of users) {
      const data = {
        distance: Math.floor(Math.random() * 1000) + 1, // Generate a random distance between 1 and 4040
        language_pref_id: randomLanguageId(), // Generate a random language id
        gender_pref: randomGender(),
        user_id: user.id,
      };

      preferences.push(data);
    }

    await db.insertInto('preference').values(preferences).execute();
  } catch (error) {
    throw new Error(`Impossible to insert users preferences: ${String(error)}`);
  }
};
