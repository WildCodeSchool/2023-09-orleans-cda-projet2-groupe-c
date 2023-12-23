import { createContext, useCallback, useContext, useMemo } from 'react';

import type { UserTable } from '@app/shared';

import { useAuth } from '@/contexts/AuthContext';
import useInteractions from '@/hooks/use-interactions';

type HomeProviderProps = {
  readonly children: React.ReactNode;
};

type HomeProviderState = {
  selectedUser: UserTable | undefined;
  superLikesCount: number;
  handleLikeClick: () => void;
  handleSuperLikeClick: () => void;
  handleNextClick: () => void;
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

  const handleLikeClick = useCallback(
    () => handleInteraction('like'),
    [handleInteraction],
  );

  const handleSuperLikeClick = useCallback(
    () => handleInteraction('superlike'),
    [handleInteraction],
  );

  const handleNextClick = useCallback(
    () => handleInteraction('next'),
    [handleInteraction],
  );

  // Create an objet with the value to be shared
  // Memorize the value to avoid re-rendering
  const value = useMemo(() => {
    return {
      selectedUser,
      superLikesCount,
      handleLikeClick,
      handleSuperLikeClick,
      handleNextClick,
    };
  }, [
    selectedUser,
    superLikesCount,
    handleLikeClick,
    handleSuperLikeClick,
    handleNextClick,
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
