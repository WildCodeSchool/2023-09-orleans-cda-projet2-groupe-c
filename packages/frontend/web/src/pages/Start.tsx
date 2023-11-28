import { useEffect, useState } from 'react';

import { useDisclosure } from '@app/frontend-shared';
import type { SomeInterface, User } from '@app/types';

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

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        marginTop: '200px',
      }}
    >
      <h1 className='text-primary font-title dark:text-light-medium dark:bg-dark-medium text-3xl  underline'>
        {'Hello world!'}
      </h1>
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
