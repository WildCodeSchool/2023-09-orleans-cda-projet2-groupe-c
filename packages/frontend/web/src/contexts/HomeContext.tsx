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
const homeProviderContext = createContext<HomeProviderState | undefined>(
  undefined,
);

export default function HomeContext({ children, ...props }: HomeProviderProps) {
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
    <homeProviderContext.Provider {...props} value={value}>
      {children}
    </homeProviderContext.Provider>
  );
}

export const useHome = () => {
  const context = useContext(homeProviderContext);

  if (!context) {
    throw new Error('useHome must be used within a HomeProvider');
  }

  return context;
};
