import HomeContext from '@/contexts/HomeContext';

import { useAuth } from '../contexts/AuthContext';
import HomeButtons from './home/HomeButtons';
import HomeCards from './home/HomeCards';

export default function AuthLayout() {
  const { isLoggedIn } = useAuth();

  // If the user is logged in, display the cards
  if (isLoggedIn) {
    return (
      <HomeContext>
        <HomeCards />
      </HomeContext>
    );
  }

  // else display the buttons
  return <HomeButtons />;
}
