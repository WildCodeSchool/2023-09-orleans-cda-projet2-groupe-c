import type { Gender } from './database';

export interface RequestPreferencesBody {
  distance?: number;
  genderPref?: Gender;
  languagePref?: number;
}

export interface UserPreferenceId {
  preference_id: number;
}
