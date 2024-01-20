import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from './components/AuthLayout';
import Login from './components/auth/Login';
import ErrorLayout from './components/error/ErrorLayout';
import Interactions from './components/home/Interactions';
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
            path: '',
            element: <Interactions />,
          },
          {
            path: '/profile/:profileId/interactions',
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
