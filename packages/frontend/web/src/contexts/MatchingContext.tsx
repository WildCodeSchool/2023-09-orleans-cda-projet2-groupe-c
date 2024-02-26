import { createContext, useContext, useMemo, useState } from 'react';

type MatchingProviderProps = {
  readonly children: React.ReactNode;
};

type MatchingState = {
  isMatching: boolean;
};

const matchingProviderContext = createContext<MatchingState | undefined>(
  undefined,
);

export default function MatchingContext({
  children,
  ...props
}: MatchingProviderProps) {
  const [isMatching, setIsMatching] = useState<boolean>(false);

  const fecthMatching = async () => {
    const controller = new AbortController();
    try {
      const response = await fetch('/api/users/interactions/verify', {
        signal: controller.signal,
      });

      const data = (await response.json()) as { isMatching: boolean };
      setIsMatching(data.isMatching);

      if (isMatching) {
        console.log('coucou');
      } else {
        console.log('brahhhh');
      }

      return () => {
        controller.abort();
      };
    } catch {
      //
    }
  };
  const value = useMemo(() => {
    return {
      isMatching,
    };
  }, [isMatching]);

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
