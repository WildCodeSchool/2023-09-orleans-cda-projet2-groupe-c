export * from './database';
export * from './auth';
export * from './register-validation';

export type User = {
  name: string;
  email: string;
};

export interface SomeInterface {
  someProperty: string;
}
