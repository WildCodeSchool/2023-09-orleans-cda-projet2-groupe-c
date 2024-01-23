import { db } from '@app/backend-shared';

enum GENDER {
  Woman = 'woman',
  Man = 'man',
  NonBinary = 'non-binary',
}

export const insertUsersPreferences = async () => {
  try {
    // Get all languages id
    const languagesId = await db.selectFrom('language').select('id').execute();

    // Get a random language id
    const randomLanguageId = () => {
      return languagesId[Math.floor(Math.random() * languagesId.length)].id;
    };

    const preferences = [
      {
        distance: 300,
        language_pref_id: randomLanguageId(),
        gender_pref: GENDER.Woman,
      },
      {
        distance: 500,
        language_pref_id: randomLanguageId(),
        gender_pref: GENDER.Man,
      },
      {
        distance: 1000,
        language_pref_id: randomLanguageId(),
        gender_pref: GENDER.NonBinary,
      },
    ];

    await db.insertInto('preference').values(preferences).execute();
  } catch (error) {
    throw new Error(`Impossible to insert users preferences: ${String(error)}`);
  }
};
