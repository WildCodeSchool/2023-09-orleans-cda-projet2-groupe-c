import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { RequestPreferencesBody } from '@app/shared';

import { useAuth } from '@/contexts/AuthContext';
import useInteractions from '@/hooks/use-interactions';

import { useInteraction } from './InteractionContext';

type PreferenceProviderProps = {
  readonly children: React.ReactNode;
};

type PreferenceProviderState = {
  isVisibleFilter: boolean;
  handleClick: () => void;
  preferences?: RequestPreferencesBody;
  errorPreferences?: string;
  updatePreferences: (newPreferences: RequestPreferencesBody) => void;
};

const API_URL = import.meta.env.VITE_API_URL;

const preferenceProviderContext = createContext<
  PreferenceProviderState | undefined
>(undefined);

export default function PreferenceContext({
  children,
  ...props
}: PreferenceProviderProps) {
  // State to store user preferences
  const [preferences, setPreferences] = useState<RequestPreferencesBody>();

  // State to store the error message
  const [errorPreferences, setErrorPreferences] = useState<string>();

  // State to display the sidebar Filter
  const [isVisibleFilter, setIsVisibleFilter] = useState<boolean>(false);

  // Get user id from auth context
  const { userId } = useAuth();

  const { fetchUsers } = useInteraction();

  // State to display the sidebar Filter on mobile in the navbar on click
  const handleClick = () => {
    setIsVisibleFilter((prev) => !prev);
  };

  // Function to fetch all user preferences
  const fetchPreferences = useCallback(
    async ({ signal }: { signal: AbortSignal }) => {
      const res = await fetch(`${API_URL}/users/${userId}/preferences`, {
        credentials: 'include', // Send cookies
        signal,
      });

      const data = await res.json();

      setPreferences(data[0]);
    },
    [userId],
  );

  // Set the visibility of the sidebar on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsVisibleFilter(true);
      } else {
        setIsVisibleFilter(false);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Fetch user preferences
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchPreferences({ signal }).catch(() => {
      setErrorPreferences(
        'ⓘ An error occurred while fetching user preferences.',
      );
    });
  }, [fetchPreferences]);

  // Function to update the preferences
  const updatePreferences = useCallback(
    async (newPreferences: RequestPreferencesBody) => {
      // Update the preferences in the database
      await fetch(`${API_URL}/users/${userId}/preferences`, {
        method: 'PUT',
        credentials: 'include', // Send cookies
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(newPreferences),
      });

      const controller = new AbortController();
      const signal = controller.signal;

      // Fetch the new preferences
      await fetchPreferences({ signal }).catch(() => {
        setErrorPreferences(
          'ⓘ An error occurred while fetching user preferences.',
        );
      });

      // Fetch the new users
      await fetchUsers({ signal }).catch(() => {
        setErrorPreferences('ⓘ An error occurred while fetching users.');
      });

      return () => {
        controller.abort();
      };
    },
    [userId, fetchPreferences, fetchUsers],
  );

  const value = useMemo(() => {
    return {
      isVisibleFilter,
      handleClick,
      preferences,
      errorPreferences,
      updatePreferences,
    };
  }, [isVisibleFilter, preferences, errorPreferences, updatePreferences]);

  return (
    <preferenceProviderContext.Provider {...props} value={value}>
      {children}
    </preferenceProviderContext.Provider>
  );
}

export const usePreference = () => {
  const context = useContext(preferenceProviderContext);

  if (!context) {
    throw new Error('usePreference must be used within an AuthProvider');
  }

  return context;
};
