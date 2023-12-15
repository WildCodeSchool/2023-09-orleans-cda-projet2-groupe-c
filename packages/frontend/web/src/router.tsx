import { createBrowserRouter } from 'react-router-dom';

import Login from './components/auth/Login';
import HomeButtons from './components/home/HomeButtons';
import HomeCards from './components/home/HomeCards';
import { useAuth } from './contexts/AuthContext';
import Home from './pages/Home';

function AuthLayout() {
  const { isLoggedIn } = useAuth();

  // eslint-disable-next-line unicorn/prefer-ternary
  if (isLoggedIn) {
    return <HomeCards />;
  } else {
    return <HomeButtons />;
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <AuthLayout />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

export default router;
