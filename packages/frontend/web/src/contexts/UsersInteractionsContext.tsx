import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { InteractionBody } from '@app/shared';

import { useInteraction } from './InteractionContext';

type UsersInteractionsProviderProps = {
  readonly children: React.ReactNode;
};

type UsersInteractionsState = {
  interactionsSent: InteractionBody[];
  sortedInteractionsReceived: InteractionBody[];
  isVisible: boolean;
  handleClick: (button: 'profileLiked' | 'usersLikedMe') => void;
};

interface FetchInteractions {
  interactionType: string;
  signal: AbortSignal;
  setter: React.Dispatch<React.SetStateAction<InteractionBody[]>>;
}

const usersInteractionsProviderContext = createContext<
  UsersInteractionsState | undefined
>(undefined);

// Function to fetch all interactions sent or received
const fetchInteractions = async ({
  interactionType,
  signal,
  setter,
}: FetchInteractions) => {
  const response = await fetch(`/api/users/interactions/${interactionType}`, {
    signal,
  });

  const data = await response.json();

  setter(data);
};

export default function UsersInteractionsContext({
  children,
  ...props
}: UsersInteractionsProviderProps) {
  // State to store the user interactions sent
  const [interactionsSent, setInteractionsSent] = useState<InteractionBody[]>(
    [],
  );

  // State to store the user interactions received
  const [interactionsReceived, setInteractionsReceived] = useState<
    InteractionBody[]
  >([]);

  // State to toggle the visibility of the profile header
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const { handleInteraction, handleBackInteraction } = useInteraction();

  // Function to toggle the visibility of the profile header
  const handleClick = useCallback(
    (button: 'profileLiked' | 'usersLikedMe') => {
      // If the button clicked is the same as the one already clicked, do nothing
      if (
        (button === 'profileLiked' && isVisible) ||
        (button === 'usersLikedMe' && !isVisible)
      ) {
        return;
      }

      setIsVisible(!isVisible);
    },
    [isVisible],
  );

  // Fetch the users the user logged in have interacted with
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchInteractions({
      interactionType: 'sent',
      signal,
      setter: setInteractionsSent,
    }).catch((error) => {
      throw new Error(`Failed to fetch users liked: ${String(error)}`);
    });

    fetchInteractions({
      interactionType: 'received',
      signal,
      setter: setInteractionsReceived,
    }).catch((error) => {
      throw new Error(`Failed to fetch users liked: ${String(error)}`);
    });

    return () => {
      controller.abort();
    };
  }, [handleInteraction, handleBackInteraction]);

  // Function to sort the interactions received by superlike_at only if isVisible is false
  const sortInteractions = (interactions: InteractionBody[]) => {
    if (!isVisible) {
      // Create a new array of interactions and sort them by superlike_at
      return [...interactions].sort((a, b) => {
        if (Boolean(b.superlike_at) && !Boolean(a.superlike_at)) {
          return 1;
        }
        if (!Boolean(b.superlike_at) && Boolean(a.superlike_at)) {
          return -1;
        }
        return 0;
      });
    }
    return interactions;
  };

  const sortedInteractionsReceived = sortInteractions(interactionsReceived);

  const value = useMemo(() => {
    return {
      interactionsSent,
      sortedInteractionsReceived,
      isVisible,
      handleClick,
    };
  }, [interactionsSent, sortedInteractionsReceived, isVisible, handleClick]);

  return (
    <usersInteractionsProviderContext.Provider {...props} value={value}>
      {children}
    </usersInteractionsProviderContext.Provider>
  );
}

export const useUsersInteractions = () => {
  const context = useContext(usersInteractionsProviderContext);

  if (context === undefined) {
    throw new Error(
      'useUsersInteractions must be used within a UsersInteractionsContext',
    );
  }

  return context;
};
