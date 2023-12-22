import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { UserTable } from '@app/shared';

import useInteractions from '@/hooks/use-interactions';

import { useAuth } from './AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

type HomeProviderProps = {
  readonly children: React.ReactNode;
};

type HomeProviderState = {
  // users: Array<UserTable>;
  selectedUser?: UserTable;
  handleLikeClick: () => void;
  handleSuperLikeClick: () => void;
  handleNextClick: () => void;
  superLikeCount: number;
};

// Create a context
const homeProviderContext = createContext<HomeProviderState | undefined>(
  undefined,
);

export default function HomeContext({ children, ...props }: HomeProviderProps) {
  // Get the current user id from the auth context
  const { userId } = useAuth();

  const [users, setUsers] = useState<Array<UserTable>>([]);
  const [userIndex, setUserIndex] = useState<number>(0);

  // State to store the selected user
  const [selectedUser, setSelectedUser] = useState<UserTable>();

  // State to store the number of superlikes, 5 by default
  const [superLikeCount, setSuperLikeCount] = useState<number>(0);

  // Get the function "fetchUserSuperLikeCount" from the hook useInteractions
  const { fetchUserSuperLikeCount } = useInteractions({
    userId,
    setSuperLikeCount,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/users/${userId}`, { signal });
        const data = await res.json();

        setSelectedUser(data);

        // Set a list of users in the state "users"
        setUsers(data);
      } catch (error) {
        throw new Error(`Fail to fetch users: ${String(error)}`);
      }
    };

    fetchUsers().catch((error) => {
      throw new Error(`Fail to fetch users: ${String(error)}`);
    });

    fetchUserSuperLikeCount({ signal }).catch((error) => {
      throw new Error(`Fail to fetch user's superlike: ${String(error)}`);
    });

    // Abort all fetch requests if the component is unmounted
    return () => {
      controller.abort();
    };
  }, [userId, fetchUserSuperLikeCount]);

  // Handle the interactions
  const handleInteraction = useCallback(
    async (interactionType: string) => {
      try {
        try {
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
        } catch (error) {
          throw new Error(`Fail to send a request: ${String(error)}`);
        }

        // Fetch superlikes count from a user and set the new value in superLikeCount
        try {
          const controller = new AbortController();
          const signal = controller.signal;
          fetchUserSuperLikeCount({ signal }).catch((error) => {
            throw new Error(`Fail to fetch user's superlike: ${String(error)}`);
          });

          const fetchUsers = async () => {
            try {
              const res = await fetch(`${API_URL}/users/${userId}`, {
                method: 'POST',
                headers: {
                  'content-type': 'application/json',
                },
                body: JSON.stringify({
                  userIndex: 0,
                }),
              });
              const data = await res.json();

              setSelectedUser(data);
              setUserIndex((prev) => prev + 1);
            } catch (error) {
              throw new Error(`Fail to fetch users: ${String(error)}`);
            }
          };

          fetchUsers().catch((error) => {
            throw new Error(`Fail to fetch users: ${String(error)}`);
          });

          () => {
            controller.abort();
          };
        } catch (error) {
          throw new Error(`Fail to fetch user's superlike: ${String(error)}`);
        }

        // // Swipe to the next user
        // try {
        //   // Select the current user index
        //   const currentIndex = users.findIndex(
        //     (user) => user.id === selectedUser.id,
        //   );
        //   // Select the next user index
        //   const nextIndex = (currentIndex + 1) % users.length;

        //   // Set the next user as the selected user
        //   setSelectedUser(users[nextIndex]);
        // } catch (error) {
        //   throw new Error(`Fail to select the next user: ${String(error)}`);
        // }
      } catch (error) {
        throw new Error(`Fail to ${interactionType} a user: ${String(error)}`);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchUserSuperLikeCount, selectedUser?.id, userId, users, userIndex],
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
      // users,
      selectedUser,
      handleLikeClick,
      handleSuperLikeClick,
      handleNextClick,
      superLikeCount,
    };
  }, [
    selectedUser,
    // users,
    handleLikeClick,
    handleSuperLikeClick,
    handleNextClick,
    superLikeCount,
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
