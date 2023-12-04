import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Theme = 'system' | 'light' | 'dark';

type ThemeProviderProps = {
  readonly children: React.ReactNode;
  readonly defaultTheme?: Theme;
  readonly storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const themeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined,
);

export function ThemeContext({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(storageKey);
    return storedTheme ?? '' ? (storedTheme as Theme) : defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme: (theme: Theme) => {
        localStorage.setItem(storageKey, theme);
        setTheme(theme);
      },
    }),
    [theme, storageKey],
  );

  return (
    <themeProviderContext.Provider {...props} value={value}>
      {children}
    </themeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(themeProviderContext);

  if (!context) throw new Error('useTheme must be used within a ThemeContext');

  return context;
};
