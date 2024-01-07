import { useEffect } from 'react';

import { useAuth } from '../contexts/AuthContext';
import HomeButtons from './home/HomeButtons';
import HomeCards from './home/HomeCards';

export default function AuthLayout() {
  const { isLoggedIn, userId, verifyToken } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      verifyToken();
    }
  }, [isLoggedIn, verifyToken]);

  // If the user is logged in, display the cards
  if (isLoggedIn) {
    return <HomeCards userId={userId} />;
  }

  // else display the buttons
  return <HomeButtons />;
}
