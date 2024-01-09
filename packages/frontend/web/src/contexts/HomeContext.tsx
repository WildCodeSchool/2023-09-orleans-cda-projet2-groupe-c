import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type HomeProviderProps = {
  readonly children: React.ReactNode;
};

type HomeProviderState = {
  isVisible: boolean;
  handleClick: () => void;
};

const homeProviderContext = createContext<HomeProviderState | undefined>(
  undefined,
);

export default function HomeContext({ children, ...props }: HomeProviderProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleClick = () => {
    setIsVisible((prev) => !prev);
  };

  // Set the visibility of the sidebar on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const value = useMemo(() => {
    return {
      isVisible,
      handleClick,
    };
  }, [isVisible]);

  return (
    <homeProviderContext.Provider {...props} value={value}>
      {children}
    </homeProviderContext.Provider>
  );
}

export const useHome = () => {
  const context = useContext(homeProviderContext);

  if (!context) {
    throw new Error('useHome must be used within an AuthProvider');
  }

  return context;
};
