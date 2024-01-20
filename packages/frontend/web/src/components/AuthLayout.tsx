import InteractionContext from '@/contexts/InteractionContext';

import { useAuth } from '../contexts/AuthContext';
import HomeButtons from './home/HomeButtons';
import HomeCards from './home/HomeCards';

export default function AuthLayout() {
  const { isLoggedIn } = useAuth();

  // If the user is logged in, display the cards
  if (isLoggedIn) {
    return (
      <InteractionContext>
        <HomeCards />
      </InteractionContext>
    );
  }

  // else display the buttons
  return <HomeButtons />;
}
