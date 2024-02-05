import { db } from '@app/backend-shared';

export type PreferenceBody = Awaited<ReturnType<typeof userPreferences>>;

// Get the user preferences
const userPreferences = async (userId: number) => {
  const result = await db
    .selectFrom('preference as p')
    .select([
      'p.id',
      'p.distance',
      'p.gender_pref',
      'p.language_pref_id',
      'p.user_id',
    ])
    .where('p.user_id', '=', userId)
    .execute();

  return result;
};

const preferences = {
  // Get the user preferences
  getUserPreferences: async (userId: number) => {
    try {
      const preferences = await userPreferences(userId);

      return preferences;
    } catch {
      throw new Error('An error occurred while fetching user preferences.');
    }
  },
};

export default preferences;
