import { Outlet } from 'react-router-dom';

import InteractionContext from '@/contexts/InteractionContext';

import { useAuth } from '../contexts/AuthContext';
import HomeButtons from './home/HomeButtons';

export default function AuthLayout() {
  const { isLoggedIn } = useAuth();

  // If the user is logged in, display the cards
  if (isLoggedIn) {
    return (
      <InteractionContext>
        <Outlet />
      </InteractionContext>
    );
  }

  // else display the buttons
  return <HomeButtons />;
}
