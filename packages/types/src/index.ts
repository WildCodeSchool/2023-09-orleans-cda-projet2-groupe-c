export * from './database';

export type User = {
  name: string;
  email: string;
};

export interface SomeInterface {
  someProperty: string;
}

export interface ButtonProps {
  word: string;
  path: string;
  isOutline: boolean;
}

export type StringArray = string[];
