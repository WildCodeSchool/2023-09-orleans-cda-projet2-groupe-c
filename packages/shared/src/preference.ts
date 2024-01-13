import type { Gender } from './database';

export interface RequestBody {
  distance?: number;
  genderPref?: Gender;
  languagePref?: number;
}

export interface UserPreference {
  preference_id: number;
}
