import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { type ColorSchemeName, useColorScheme } from 'react-native';

import { darkModeColors, lightModeColors } from '../themes/theme';

const THEME_ASYNC_STORAGE_KEY = 'THEME_STATE';

type ThemeProviderProps = {
  readonly children: React.ReactNode;
};

type ThemeProviderState = {
  theme: ColorSchemeName;
  setTheme: React.Dispatch<React.SetStateAction<ColorSchemeName>>;
  isLoading: boolean;
};

const themeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined,
);

export function ThemeContext({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ColorSchemeName>();
  const [isLoading, setIsLoading] = useState(true);

  // Load the preference from AsyncStorage on app launch
  useEffect(() => {
    const load = async () => {
      const storedTheme = (await AsyncStorage.getItem(
        THEME_ASYNC_STORAGE_KEY,
      )) as ColorSchemeName;

      setTheme(storedTheme);
      setIsLoading(false);
    };

    load().catch((error) => {
      throw new Error(error);
    });
  }, []);

  // Update AsyncStorage when the theme preference changes
  useEffect(() => {
    if (theme) {
      AsyncStorage.setItem(THEME_ASYNC_STORAGE_KEY, theme).catch((error) => {
        throw new Error(error);
      });
    } else {
      AsyncStorage.removeItem(THEME_ASYNC_STORAGE_KEY).catch((error) => {
        throw new Error(error);
      });
    }
  }, [theme]);

  const value = useMemo(
    () => ({
      isLoading,
      setTheme,
      theme,
    }),
    [theme, isLoading],
  );

  if (isLoading) {
    return;
  }

  return (
    <themeProviderContext.Provider value={value}>
      {children}
    </themeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(themeProviderContext);
  const systemColorScheme = useColorScheme();

  if (!context) throw new Error('useTheme must be used within a ThemeContext');

  const { theme, isLoading, setTheme } = context;

  if (isLoading) {
    throw new Error('Tried to use ThemeContext before initialized');
  }

  const colorTheme: NonNullable<ColorSchemeName> =
    theme ?? systemColorScheme ?? 'light';

  return {
    colors: colorTheme === 'dark' ? darkModeColors : lightModeColors,
    colorTheme,
    setColorTheme: useCallback(
      (themeName: ColorSchemeName) => {
        setTheme(themeName);
      },
      [setTheme],
    ),
  };
};
