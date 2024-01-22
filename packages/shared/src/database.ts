import type { Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface BaseTable {
  id: Generated<number>;
  name: string;
  logo_path: string;
}

export interface TechnologyTable extends BaseTable {}

export interface LanguageTable extends BaseTable {}

export interface HobbyCategoryTable extends BaseTable {}

export interface PictureTable {
  id: Generated<number>;
  order?: number;
  picture_path: string;
  user_id: number;
}

export type Gender = 'man' | 'woman' | 'non-binary';

export type Role = 'user' | 'admin';

export type Point = {
  x: number;
  y: number;
};

export type GeoJson = {
  x: number;
  y: number;
  coordinates: [number, number];
};

export interface UserTable {
  id: Generated<number>;
  name?: string;
  birthdate?: Date;
  gender?: Gender;
  biography?: string;
  account_github?: string;
  role: Role;
  email: string;
  password: string;
  email_verified_at?: Date;
  activation_code?: string;
  activate_at?: Date;
  city_id?: number;
  preference_id?: number;
}

export interface HobbyTable {
  id: Generated<number>;
  name: string;
  hobby_category_id: number;
}

export interface CityTable {
  id: Generated<number>;
  name: string;
  coordinates: Point & GeoJson;
}

export interface MessageTable {
  id: Generated<number>;
  content?: string;
  sent_at: Date;
  conversation_id: number;
  sender_id: number;
}

export interface IntermediateTable {
  id: Generated<number>;
  order?: number;
  user_id: number;
}

export interface TechnologyUserTable extends IntermediateTable {
  technology_id: number;
}

export interface LanguageUserTable extends IntermediateTable {
  language_id: number;
}

export interface HobbyUserTable extends IntermediateTable {
  hobby_id: number;
}

export interface UserActionTable {
  id: Generated<number>;
  initiator_id: number;
  receiver_id: number;
  liked_at?: Date;
  superlike_at?: Date;
  next_at?: Date;
  canceled_at?: Date;
}

export interface PreferenceTable {
  id: Generated<number>;
  distance: number;
  language_pref_id: number;
  gender_pref: Gender;
}

export type Technology = Selectable<TechnologyTable>;
export type NewTechnology = Insertable<TechnologyTable>;
export type TechnologyUpdate = Updateable<TechnologyTable>;

export type Language = Selectable<LanguageTable>;
export type NewLanguage = Insertable<LanguageTable>;
export type LanguageUpdate = Updateable<LanguageTable>;

export type HobbyCategory = Selectable<HobbyCategoryTable>;
export type NewHobbyCategory = Insertable<HobbyCategoryTable>;
export type HobbyCategoryUpdate = Updateable<HobbyCategoryTable>;

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export type Picture = Selectable<PictureTable>;
export type NewPicture = Insertable<PictureTable>;
export type PictureUpdate = Updateable<PictureTable>;

export type Hobby = Selectable<HobbyTable>;
export type NewHobby = Insertable<HobbyTable>;
export type HobbyUpdate = Updateable<HobbyTable>;

export type City = Selectable<CityTable>;
export type NewCity = Insertable<CityTable>;
export type CityUpdate = Updateable<CityTable>;

export type Message = Selectable<MessageTable>;
export type NewMessage = Insertable<MessageTable>;
export type MessageUpdate = Updateable<MessageTable>;

export type TechnologyUser = Selectable<TechnologyUserTable>;
export type NewTechnologyUser = Insertable<TechnologyUserTable>;
export type TechnologyUserUpdate = Updateable<TechnologyUserTable>;

export type LanguageUser = Selectable<LanguageUserTable>;
export type NewLanguageUser = Insertable<LanguageUserTable>;
export type LanguageUserUpdate = Updateable<LanguageUserTable>;

export type HobbyUser = Selectable<HobbyUserTable>;
export type NewHobbyUser = Insertable<HobbyUserTable>;
export type HobbyUserUpdate = Updateable<HobbyUserTable>;

export type UserAction = Selectable<UserActionTable>;
export type NewUserAction = Insertable<UserActionTable>;
export type UserActionUpdate = Updateable<UserActionTable>;

export type Preference = Selectable<PreferenceTable>;
export type NewPreference = Insertable<PreferenceTable>;
export type PreferenceUpdate = Updateable<PreferenceTable>;

export interface Database {
  hobby_category: HobbyCategoryTable;
  technology: TechnologyTable;
  language: LanguageTable;
  user: UserTable;
  picture: PictureTable;
  hobby: HobbyTable;
  city: CityTable;
  message: MessageTable;
  technology_user: TechnologyUserTable;
  language_user: LanguageUserTable;
  hobby_user: HobbyUserTable;
  user_action: UserActionTable;
  preference: PreferenceTable;
}
