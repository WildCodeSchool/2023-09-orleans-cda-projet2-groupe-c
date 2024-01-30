import { Outlet } from 'react-router-dom';

import InteractionContext from '@/contexts/InteractionContext';
import UsersInteractionsContext from '@/contexts/UsersInteractionsContext';

import { useAuth } from '../contexts/AuthContext';
import HomeButtons from './home/HomeButtons';

export default function AuthLayout() {
  const { isLoggedIn } = useAuth();

  // If the user is logged in, display the cards
  if (isLoggedIn) {
    return (
      <InteractionContext>
        <UsersInteractionsContext>
          <Outlet />
        </UsersInteractionsContext>
      </InteractionContext>
    );
  }

  // else display the buttons
  return <HomeButtons />;
}
