export * from './database';
export * from './auth';
export * from './interaction';

export interface NavigationBody {
  id: string;
  icon: JSX.Element;
  lgHidden?: boolean;
  onClick?: () => void;
}
