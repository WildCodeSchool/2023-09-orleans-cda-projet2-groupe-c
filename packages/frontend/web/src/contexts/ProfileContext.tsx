import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { UserBody } from '@app/shared';

import useAge from '@/hooks/use-age';
import useDateFormatted from '@/hooks/use-date-formatted';
import useProgressBar from '@/hooks/use-progress-bar';

import { useAuth } from './AuthContext';

type ProfileProviderProps = {
  readonly children: React.ReactNode;
};

type ProfileProviderState = {
  user: UserBody | undefined;
  percentage: number;
  birthdateFormatted: string | undefined;
  age: number;
  error: string | undefined;
  isToogleModal: boolean;
  setIsToogleModal: React.Dispatch<React.SetStateAction<boolean>>;
  fetchUserProfile: (props: { signal: AbortSignal }) => Promise<void>;
};

const profileProviderContext = createContext<ProfileProviderState | undefined>(
  undefined,
);

export default function ProfileContext({
  children,
  ...props
}: ProfileProviderProps) {
  // Get user id from the auth context
  const { userId } = useAuth();

  // State to store the user information
  const [user, setUser] = useState<UserBody>();

  // State to store the error message
  const [error, setError] = useState<string>();

  // State to toogle the modal
  const [isToogleModal, setIsToogleModal] = useState<boolean>(false);

  const fetchUserProfile = useCallback(
    async ({ signal }: { signal: AbortSignal }) => {
      const res = await fetch(`/api/users/profile`, {
        signal,
      });

      if (res.ok) {
        const data = await res.json();

        setUser(data[0]);
      }
    },
    [],
  );

  // Fetch information about the user logged in
  useEffect(() => {
    if (Boolean(userId)) {
      const controller = new AbortController();
      const signal = controller.signal;

      fetchUserProfile({ signal }).catch(() => {
        setError('Failed to fetch user profile');
      });

      return () => {
        controller.abort();
      };
    }
  }, [fetchUserProfile, userId]);

  // Format the birthdate using the custom hook "useDateFormatted"
  const birthdateFormatted = useDateFormatted({ dateString: user?.birthdate });

  // Calculate the age using the custom hook "useAge"
  const age = useAge({ userBirthdate: user?.birthdate });

  // Get the percentage of the profile completed using the custom hook "useProgressBar"
  const { percentage } = useProgressBar({ userData: user });

  const value = useMemo(() => {
    return {
      user,
      percentage,
      birthdateFormatted,
      age,
      error,
      isToogleModal,
      setIsToogleModal,
      fetchUserProfile,
    };
  }, [
    age,
    birthdateFormatted,
    percentage,
    user,
    error,
    isToogleModal,
    setIsToogleModal,
    fetchUserProfile,
  ]);

  return (
    <profileProviderContext.Provider {...props} value={value}>
      {children}
    </profileProviderContext.Provider>
  );
}

export const useProfile = () => {
  const context = useContext(profileProviderContext);

  if (!context) {
    throw new Error('useProfile must be used within a HomeProvider');
  }

  return context;
};
