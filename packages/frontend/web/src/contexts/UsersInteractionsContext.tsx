import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { InteractionBody } from '@app/shared';

import { useAuth } from './AuthContext';

type UsersInteractionsProviderProps = {
  readonly children: React.ReactNode;
};

type UsersInteractionsState = {
  interactionsSent: InteractionBody[];
  interactionsReceived: InteractionBody[];
  isVisible: boolean;
  handleClick: (button: 'profileLiked' | 'usersLikedMe') => void;
};

interface FetchInteractions {
  userId: number;
  interactionType: string;
  signal: AbortSignal;
  setter: React.Dispatch<React.SetStateAction<InteractionBody[]>>;
}

const API_URL = import.meta.env.VITE_API_URL;

const usersInteractionsProviderContext = createContext<
  UsersInteractionsState | undefined
>(undefined);

// Function to fetch all interactions sent or received
const fetchInteractions = async ({
  userId,
  interactionType,
  signal,
  setter,
}: FetchInteractions) => {
  const profileLiked = await fetch(
    `${API_URL}/users/${userId}/interactions/${interactionType}`,
    {
      signal,
      credentials: 'include',
    },
  );

  const data = await profileLiked.json();

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

  // Get the user id JWT from the context
  const { userId } = useAuth();

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
      userId: Number(userId),
      interactionType: 'sent',
      signal,
      setter: setInteractionsSent,
    }).catch((error) => {
      throw new Error(`Failed to fetch users liked: ${String(error)}`);
    });

    fetchInteractions({
      userId: Number(userId),
      interactionType: 'received',
      signal,
      setter: setInteractionsReceived,
    }).catch((error) => {
      throw new Error(`Failed to fetch users liked: ${String(error)}`);
    });

    return () => {
      controller.abort();
    };
  }, [userId]);

  const value = useMemo(() => {
    return {
      interactionsSent,
      interactionsReceived,
      isVisible,
      handleClick,
    };
  }, [interactionsSent, interactionsReceived, isVisible, handleClick]);

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
