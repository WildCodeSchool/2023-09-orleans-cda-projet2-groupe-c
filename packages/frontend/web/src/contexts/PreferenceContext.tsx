import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { RequestPreferencesBody } from '@app/shared';

import { useAuth } from './AuthContext';
import { useInteraction } from './InteractionContext';

type PreferenceProviderProps = {
  readonly children: React.ReactNode;
};

type PreferenceProviderState = {
  isVisibleFilter: boolean;
  handleClickFilter: () => void;
  preferences?: RequestPreferencesBody;
  errorPreferences?: string;
  updatePreferences: (newPreferences: RequestPreferencesBody) => void;
  setIsVisibleFilter: React.Dispatch<React.SetStateAction<boolean>>;
  fetchPreferences: ({ signal }: { signal: AbortSignal }) => Promise<void>;
};

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

  const { isLoggedIn } = useAuth();
  const { fetchUsers } = useInteraction();

  // State to display the sidebar Filter on mobile in the navbar on click
  const handleClickFilter = useCallback(() => {
    setIsVisibleFilter((prev) => !prev);
  }, []);

  // Function to fetch all user preferences
  const fetchPreferences = useCallback(
    async ({ signal }: { signal: AbortSignal }) => {
      const res = await fetch(`/api/users/preferences`, {
        signal,
      });

      const data = await res.json();

      setPreferences(data[0]);
    },
    [],
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

    return () => {
      controller.abort();
    };
  }, [fetchPreferences, isLoggedIn]);

  // Function to update the preferences
  const updatePreferences = useCallback(
    async (newPreferences: RequestPreferencesBody) => {
      // Update the preferences in the database
      await fetch(`/api/users/preferences`, {
        method: 'PUT',
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
    [fetchPreferences, fetchUsers],
  );

  const value = useMemo(() => {
    return {
      isVisibleFilter,
      handleClickFilter,
      preferences,
      errorPreferences,
      updatePreferences,
      setIsVisibleFilter,
      fetchPreferences,
    };
  }, [
    isVisibleFilter,
    handleClickFilter,
    preferences,
    errorPreferences,
    updatePreferences,
    fetchPreferences,
  ]);

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
