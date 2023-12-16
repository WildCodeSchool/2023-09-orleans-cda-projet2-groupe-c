import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { UserTable } from '@app/types';

const API_URL = import.meta.env.VITE_API_URL;

type HomeProviderProps = {
  readonly children: React.ReactNode;
};

type HomeProviderState = {
  users: Array<UserTable>;
  selectedUser?: UserTable;
  handleLikeClick: () => void;
};

// Create a context
const homeProviderContext = createContext<HomeProviderState | undefined>(
  undefined,
);

export default function HomeContext({ children, ...props }: HomeProviderProps) {
  const [users, setUsers] = useState<Array<UserTable>>([]);
  const [selectedUser, setSelectedUser] = useState<UserTable>();
  const USER_ID = 1;

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
          (user: UserTable) => user.id !== USER_ID,
        );

        // Set a list of users in the state users
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
  }, []);

  // Add a like to the selected user and select the next user
  const handleLikeClick = useCallback(async () => {
    try {
      await fetch(`${API_URL}/users/${USER_ID}/interactions/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receiver_id: selectedUser?.id,
        }),
      });

      // Select the current user
      const currentIndex = users.findIndex(
        (user) => user.id === selectedUser?.id,
      );

      // Remove the current user from the list of users
      setUsers((prevUsers) => {
        const newUsers = [...prevUsers];
        newUsers.splice(currentIndex, 1);

        return newUsers;
      });

      // Select the next user
      const nextIndex = (currentIndex + 1) % users.length;
      setSelectedUser(users[nextIndex]);
    } catch (error) {
      throw new Error(`Fail to like a user: ${String(error)}`);
    }
  }, [selectedUser, users]);

  // Create an ibjet with the value to be shared
  // Memorize the value to avoid re-rendering
  const value = useMemo(() => {
    return {
      users,
      selectedUser,
      handleLikeClick,
    };
  }, [selectedUser, users, handleLikeClick]);

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
