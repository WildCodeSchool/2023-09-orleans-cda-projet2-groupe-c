import { createContext, useContext, useMemo, useState } from 'react';

type MatchingProviderProps = {
  readonly children: React.ReactNode;
};

type MatchingState = {
  isMatching: boolean;
  errorMatching?: string;
  fecthMatching: () => void;
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

  const fecthMatching = async () => {
    const controller = new AbortController();
    try {
      const response = await fetch(`/api/users/interactions/verify`, {
        method: 'GET',
        signal: controller.signal,
      });

      const data = (await response.json()) as { isMatching: boolean };
      setIsMatching(data.isMatching);
    } catch {
      setErrorMatching('ⓘ An error occurred while fetching user preferences.');
    }
  };
  const value = useMemo(() => {
    return {
      isMatching,
      errorMatching,
      fecthMatching,
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
