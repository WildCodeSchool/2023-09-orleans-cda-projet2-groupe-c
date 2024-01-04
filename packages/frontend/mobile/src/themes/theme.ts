type ThemeColors = {
  primary: string;
  text: string;
  background: string;
  card: string;
  border: string;
  notification: string;
};

type Colors = {
  primaryDark: string;
  placeholder: string;
  success: string;
  superLike: string;
  next: string;
};

export const lightModeColors: ThemeColors = {
  primary: '#eb0573',
  text: '#3f436a',
  background: '#eae3e3',
  card: '#f4efef',
  notification: '#fcfcfc',
  border: '#3c4045',
};

export const darkModeColors: ThemeColors = {
  primary: '#eb0573',
  text: '#fcfcfe',
  background: '#111214',
  card: '#1c1c1f',
  notification: '#272721',
  border: '#4d4f58',
};

export const themeColors: Colors = {
  primaryDark: '#bd0069',
  placeholder: '#9c89a2',
  success: '#51d686',
  superLike: '#59c3ff',
  next: '#d52121',
};
