import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { UserTable } from '@app/shared';

import { useAuth } from './AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

type HomeProviderProps = {
  readonly children: React.ReactNode;
};

type HomeProviderState = {
  users: Array<UserTable>;
  selectedUser?: UserTable;
  handleLikeClick: () => void;
  handleSuperLikeClick: () => void;
  handleNextClick: () => void;
};

// Create a context
const homeProviderContext = createContext<HomeProviderState | undefined>(
  undefined,
);

export default function HomeContext({ children, ...props }: HomeProviderProps) {
  // State to store the list of users
  const [users, setUsers] = useState<Array<UserTable>>([]);

  // State to store the selected user
  const [selectedUser, setSelectedUser] = useState<UserTable>();

  // State to store the number of superlikes
  const [superLikeCount, setSuperLikeCount] = useState<number>(5);

  const { userId } = useAuth();

  // Fetch users to display
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      (async () => {
        const res = await fetch(`${API_URL}/users`, { signal });
        const data = await res.json();

        // Remove the current user from the list of users
        const filteredUsers = data.filter(
          (user: UserTable) => Number(user.id) !== userId,
        );

        // Set a list of users in the state "users"
        setUsers(filteredUsers);

        // Set the first user of the list as the selected user
        setSelectedUser(filteredUsers[0]);
      })();
    } catch (error) {
      throw new Error(`Fail to fetch users: ${String(error)}`);
    }

    // Abort the fetch request if the component is unmounted
    return () => {
      controller.abort();
    };
  }, [userId]);

  // Handle the interactions
  const handleInteraction = useCallback(
    async (interactionType: string) => {
      try {
        if (interactionType === 'superlike') {
          // If the user has no more superlikes, throw an error
          if (superLikeCount === 0) {
            throw new Error('You have no more superlikes');
          } else {
            // Else, decrement the superlike count
            setSuperLikeCount(superLikeCount - 1);
          }
        }

        // Send a request to the API to like, superlike or next a user
        await fetch(
          `${API_URL}/users/${userId}/interactions/${interactionType}`,
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              receiver_id: selectedUser?.id, // Send in the body the id of the selected user
            }),
          },
        );

        // Select the current user index
        const currentIndex = users.findIndex(
          (user) => user.id === selectedUser?.id,
        );

        // Select the next user
        const nextIndex = (currentIndex + 1) % users.length;
        setSelectedUser(users[nextIndex]);
      } catch (error) {
        throw new Error(`Fail to ${interactionType} a user: ${String(error)}`);
      }
    },
    [selectedUser, users, superLikeCount, userId],
  );

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
      users,
      selectedUser,
      handleLikeClick,
      handleSuperLikeClick,
      handleNextClick,
    };
  }, [
    selectedUser,
    users,
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
