import { Outlet } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import HomeButtons from './home/HomeButtons';

export default function AuthLayout() {
  const { isLoggedIn } = useAuth();

  // If the user is logged in, display the cards
  if (isLoggedIn) {
    
    return <Outlet />;
  }

  // else display the buttons
  return <HomeButtons />;
}
