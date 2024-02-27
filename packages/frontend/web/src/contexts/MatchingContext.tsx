import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type MatchingProviderProps = {
  readonly children: React.ReactNode;
};

type MatchingState = {
  isMatching: boolean;
  fetchMatching: ({ signal }: { signal: AbortSignal }) => Promise<void>;
  errorMatching?: string;
  setIsMatching: React.Dispatch<React.SetStateAction<boolean>>;
};

const matchingProviderContext = createContext<MatchingState | undefined>(
  undefined,
);

export default function MatchingContext({
  children,
  ...props
}: MatchingProviderProps) {
  const [isMatching, setIsMatching] = useState<boolean>(false);
  const [errorMatching, setErrorMatching] = useState<string>();

  const fetchMatching = async ({ signal }: { signal: AbortSignal }) => {
    try {
      const response = await fetch('/api/users/interactions/verify', {
        signal,
      });

      const data = (await response.json()) as { isMatching: boolean };
      setIsMatching(data.isMatching);
    } catch {
      setErrorMatching('ⓘ An error occurred while fetching Matching verify.');
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchMatching({ signal }).catch(() => {
      setErrorMatching('coucou');
    });

    return () => {
      controller.abort();
    };
  }, []);
  const value = useMemo(() => {
    return {
      isMatching,
      errorMatching,
      fetchMatching,
      setIsMatching,
    };
  }, [errorMatching, isMatching]);

  return (
    <matchingProviderContext.Provider {...props} value={value}>
      {children}
    </matchingProviderContext.Provider>
  );
}

export const useMatching = () => {
  const context = useContext(matchingProviderContext);

  if (!context) {
    throw new Error('useMatching must be used within a ConversationProvider');
  }

  return context;
};
