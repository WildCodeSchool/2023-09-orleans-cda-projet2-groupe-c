import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from './components/AuthLayout';
import Login from './components/auth/Login';
import ErrorLayout from './components/error/ErrorLayout';
import ProfileInteractionLayout from './components/user-interaction/ProfileInteractionLayout';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <AuthLayout />,
        children: [
          {
            path: '/profile/:profileId/interaction',
            element: <ProfileInteractionLayout />,
          },
        ],
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorLayout />,
  },
]);

export default router;
