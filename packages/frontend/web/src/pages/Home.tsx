import { useEffect, useState } from 'react';

import { useDisclosure } from '@app/frontend-shared';
import type { SomeInterface, User } from '@app/types';

import { useTheme } from '@/components/ThemeProvider';

// import ThemeProvider from '@/components/ThemeProvider';

export default function Home() {
  const [someData, setSomeData] = useState<SomeInterface>({
    someProperty: 'someValue',
  });
  const { isOpen: isDetailsOpen, onToggle: onDetailsToggle } =
    useDisclosure(false);

  const user: Partial<User> = {};

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/some-route`,
        {
          signal: abortController.signal,
        },
      );
      const data = await response.json();
      setSomeData(data);
    })();

    return () => {
      abortController.abort();
    };
  }, []);
  const { theme, setTheme } = useTheme();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        gap: '1rem',
      }}
    >
      <h1 className='text-primary font-title dark:text-light-medium dark:bg-dark-medium text-3xl  underline'>
        {'Hello world!'}
      </h1>
      {/* <ThemeProvider /> */}
      <button
        type='button'
        onClick={() => {
          // Use setTheme to change the theme
          setTheme(theme === 'dark' ? 'light' : 'dark');
        }}
      >
        {'Toggle Theme'}
      </button>
      <span>{`${someData.someProperty}`}</span>

      <button
        type='button'
        onClick={() => {
          onDetailsToggle();
        }}
      >
        {'Click me'}
      </button>

      {isDetailsOpen ? (
        <pre>
          {JSON.stringify(
            {
              user,
            },
            undefined,
            2,
          )}
        </pre>
      ) : undefined}
    </div>
  );
}
