export * from './database';
export * from './auth';

export type User = {
  name: string;
  email: string;
};

export interface SomeInterface {
  someProperty: string;
}

export interface ButtonProps {
  word: string;
  type: 'button' | 'submit' | 'reset';
  isOutline: boolean;
}

export type StringArray = string[];
