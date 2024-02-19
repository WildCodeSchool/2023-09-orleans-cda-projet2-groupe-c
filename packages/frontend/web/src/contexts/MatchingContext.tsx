import { createContext, useContext, useEffect, useMemo } from 'react';

import { useConversation } from './ConversationContext';
import { useInteraction } from './InteractionContext';

type MatchingProviderProps = {
  readonly children: React.ReactNode;
};

type MatchingState = {
  //
};

const matchingProviderContext = createContext<MatchingState | undefined>(
  undefined,
);

export default function MatchingContext({
  children,
  ...props
}: MatchingProviderProps) {
  const { fetchConversations } = useConversation();
  const { handleInteraction } = useInteraction();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      await fetch(
        `${import.meta.env.VITE_API_URL}/users/interactions/verify`,
        {
          signal,
          credentials: 'include',
        },
      );
    })();

    fetchConversations({ signal });

    return () => {
      controller.abort();
    };
  }, [fetchConversations, handleInteraction]);

  const value = useMemo(() => {
    return {
      //todo send isMatching for modal y
    };
  }, []);

  return (
    <matchingProviderContext.Provider {...props} value={value}>
      {children}
    </matchingProviderContext.Provider>
  );
}

export const useMatching = () => {
  const context = useContext(matchingProviderContext);

  if (!context) {
    throw new Error('useMatching must be used with a MatchingProvider');
  }

  return context;
};
