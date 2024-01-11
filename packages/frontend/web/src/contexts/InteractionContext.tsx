import { createContext, useContext, useMemo } from 'react';

import type { User } from '@app/shared';

import { useAuth } from '@/contexts/AuthContext';
import useInteractions from '@/hooks/use-interactions';

type HomeProviderProps = {
  readonly children: React.ReactNode;
};

type HomeProviderState = {
  selectedUser: User | undefined;
  superLikesCount: number;
  handleInteraction: (action: string) => void;
};

// Create a context
const interactionProviderContext = createContext<HomeProviderState | undefined>(
  undefined,
);

export default function InteractionContext({
  children,
  ...props
}: HomeProviderProps) {
  // Get the current user id from the auth context
  const { userId } = useAuth();

  // Get the selected user, superlike count and the functions to handle the interactions from the custom hook "useInteractions"
  const { selectedUser, superLikesCount, handleInteraction } = useInteractions({
    userId,
  });

  // Create an objet with the value to be shared
  // Memorize the value to avoid re-rendering
  const value = useMemo(() => {
    return {
      selectedUser,
      superLikesCount,
      handleInteraction,
    };
  }, [selectedUser, superLikesCount, handleInteraction]);

  return (
    <interactionProviderContext.Provider {...props} value={value}>
      {children}
    </interactionProviderContext.Provider>
  );
}

export const useInteraction = () => {
  const context = useContext(interactionProviderContext);

  if (!context) {
    throw new Error('useInteraction must be used within a HomeProvider');
  }

  return context;
};
