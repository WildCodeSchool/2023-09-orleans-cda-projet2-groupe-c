import type {
  CityTable,
  HobbyTable,
  LanguageTable,
  PictureTable,
  TechnologyTable,
  UserTable,
} from './database';

export * from './database';
export * from './auth';

// Extend "UserTable", remove unwanted properties and add a new id property
export type UserBase = Omit<
  UserTable,
  | 'id'
  | 'role'
  | 'email'
  | 'password'
  | 'email_verified_at'
  | 'activation_code'
  | 'activate_at'
  | 'city_id'
> & { id: number };

// Extend "CityTable", remove unwanted properties and add a new id and city_id property
export type City = Omit<CityTable, 'id' | 'name'> & {
  id: number;
  city_name: string;
};

// Extend "LanguageTable", remove unwanted properties and add a new id and order property
export type Language = Omit<LanguageTable, 'id'> & {
  id: number;
  order: number | undefined;
};

// Extend "TechnologyTable", remove unwanted properties and add a new id and order property
export type Technology = Omit<TechnologyTable, 'id'> & {
  id: number;
  order: number | undefined;
};

// Extend "HobbyTable", remove unwanted properties and add a new id, order and category property
export type Hobby = Omit<HobbyTable, 'id' | 'hobby_category_id'> & {
  id: number;
  order: number | undefined;
  category: string;
};

// Extend "PictureTable", remove unwanted properties and add a new id property
export type Picture = Omit<PictureTable, 'id' | 'user_id'> & {
  id: number;
};

// Extend "UserBase" and add new fields with the new types
export interface User extends UserBase {
  city: City[] | undefined;
  languages: Language[] | undefined;
  technologies: Technology[] | undefined;
  hobbies: Hobby[] | undefined;
  pictures: Picture[] | undefined;
}
