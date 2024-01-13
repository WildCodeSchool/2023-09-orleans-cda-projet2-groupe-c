import type { Gender } from './database';

export interface RequestBody {
  distance?: number;
  genderPref?: Gender;
  languagePref?: number;
}

export interface UserPreferenceId {
  preference_id: number;
}
