import { createContext, useContext, useMemo } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import type { UserBody } from '@app/shared';

import useAge from '@/hooks/use-age';
import useDateFormatted from '@/hooks/use-date-formatted';
import useProgressBar from '@/hooks/use-progress-bar';

import { useAuth } from './AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

type ProfileProviderProps = {
  readonly children: React.ReactNode;
};

type ProfileProviderState = {
  user: UserBody | undefined;
  percentage: number;
  birthdateFormatted: string | undefined;
  age: number;
  error: string | undefined;
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

  // Get profile id from the url
  const { profileId } = useParams();

  // State to store the user information
  const [user, setUser] = useState<UserBody>();

  // State to store the error message
  const [error, setError] = useState<string>();

  // Navigate to another page using the hook "useNavigate"
  const navigate = useNavigate();

  // Fetch information about the user logged in
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchUser = async () => {
      const res = await fetch(`${API_URL}/users/${userId}/profile`, {
        signal,
        credentials: 'include',
      });

      const data = await res.json();

      setUser(data[0]);
    };

    fetchUser().catch(() => {
      setError('Failed to fetch user');
    });

    return () => {
      controller.abort();
    };
  }, [userId]);

  // Check if the user is define and if is allowed to access this page
  useEffect(() => {
    if (Boolean(userId) && userId !== Number(profileId)) {
      navigate('/error');
    }
  }, [userId, profileId, navigate]);

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
    };
  }, [age, birthdateFormatted, percentage, user, error]);

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
