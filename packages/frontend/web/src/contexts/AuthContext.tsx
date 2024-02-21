import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type AuthProviderProps = {
  readonly children: React.ReactNode;
};

type AuthProviderState = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  isLoading: boolean;
  userId: number | undefined;
  isActivated: boolean;
  setIsActivated: (value: boolean) => void;
};

// Create an authentification context
const authProviderContext = createContext<AuthProviderState | undefined>(
  undefined,
);

export default function AuthContext({ children, ...props }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isActivated, setIsActivated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<number | undefined>();

  // Verify if the user is logged in
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/auth/verify`, {
          method: 'GET',
          signal: controller.signal, // pass the signal in the request for aborting the request
        });

        // Convert the response to json
        const data = (await res.json()) as {
          ok: boolean;
          isLoggedIn: boolean;
          userId: number;
          isActivated: boolean;
        };

        if (data.ok) {
          setIsLoading(false);
          setIsLoggedIn(data.isLoggedIn);
          setUserId(data.userId);
          setIsActivated(data.isActivated);
        }
      } catch (error) {
        throw new Error(`Failed to verify auth: ${String(error)}`);
      }
    };

    // Call the function fetchData
    fetchData().catch((error) => {
      throw new Error(`Failed to verify auth: ${String(error)}`);
    });

    // Abort the request if the component is unmounted
    return () => {
      controller.abort();
    };
  }, [isLoggedIn]);

  // Memoize the values
  const value = useMemo(() => {
    return {
      isLoggedIn,
      setIsLoggedIn,
      isActivated,
      setIsActivated,
      isLoading,
      userId,
    };
  }, [
    isLoggedIn,
    setIsLoggedIn,
    isLoading,
    userId,
    isActivated,
    setIsActivated,
  ]);

  return (
    <authProviderContext.Provider {...props} value={value}>
      {children}
    </authProviderContext.Provider>
  );
}

// Custom hook to use the authentification context
export const useAuth = () => {
  const context = useContext(authProviderContext);

  // If the hook is used outside of the login
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
