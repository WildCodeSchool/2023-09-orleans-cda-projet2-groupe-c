import { createContext, useContext, useMemo } from 'react';

import type { UserBody } from '@app/shared';

import { useAuth } from '@/contexts/AuthContext';
import useDistance from '@/hooks/use-distance';
import useInteractions from '@/hooks/use-interactions';

type HomeProviderProps = {
  readonly children: React.ReactNode;
};

type HomeProviderState = {
  selectedUser?: UserBody;
  superLikesCount: number;
  handleInteraction: (action: string) => void;
  fetchUsers: ({ signal }: { signal: AbortSignal }) => Promise<void>;
  handleBackInteraction: () => void;
  distance: number;
  interactionStatus?: string;
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
  const {
    selectedUser,
    superLikesCount,
    handleInteraction,
    handleBackInteraction,
    fetchUsers,
    interactionStatus,
  } = useInteractions();

  // Get the distance between the current user and the selected user
  const { distance } = useDistance({
    userId,
    selectedUser,
  });

  // Create an objet with the value to be shared
  // Memorize the value to avoid re-rendering
  const value = useMemo(() => {
    return {
      selectedUser,
      superLikesCount,
      handleInteraction,
      handleBackInteraction,
      distance,
      fetchUsers,
      interactionStatus,
    };
  }, [
    selectedUser,
    superLikesCount,
    handleInteraction,
    handleBackInteraction,
    distance,
    fetchUsers,
    interactionStatus,
  ]);

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
