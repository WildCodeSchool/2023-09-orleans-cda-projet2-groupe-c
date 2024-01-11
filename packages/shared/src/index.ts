import type { Point } from './database';

export * from './database';
export * from './auth';
export * from './interaction';

export interface UserBody {
  id: number;
  name: string;
  birtdate: string;
  gender: string;
  biography: string;
  account_github: string;
  city: {
    id: number;
    city_name: string;
    coordinates: Point;
  };
  hobbies: [
    {
      id: number;
      name: string;
      order: number;
      category: string;
      logo_path: string;
    },
  ];
  languages: [
    {
      id: number;
      name: string;
      order: number;
      logo_path: string;
    },
  ];
  technologies: [
    {
      id: number;
      name: string;
      order: number;
      logo_path: string;
    },
  ];
  pictures: [
    {
      id: number;
      order: number;
      logo_path: string;
    },
  ];
}
