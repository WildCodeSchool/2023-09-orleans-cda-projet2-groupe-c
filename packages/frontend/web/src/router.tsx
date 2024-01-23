import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from './components/AuthLayout';
import Login from './components/auth/Login';
import RegistrationForm from './components/auth/RegistrationForm';
import Success from './components/auth/Success';
import ValidationToken from './components/auth/ValidationToken';
import ErrorLayout from './components/error/ErrorLayout';
import InteractionsLayout from './components/home/InteractionsLayout';
import ProfileInteractionLayout from './components/user-interaction/ProfileInteractionLayout';
import Home from './pages/Home';
import Registration from './pages/Registration';

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
            element: <InteractionsLayout />,
          },
          {
            path: '/profile/:profileId/interactions',
            element: <ProfileInteractionLayout />,
          },
        ],
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
  {
    path: '/registration',
    element: <Registration />,
    children: [
      {
        path: '',
        element: <RegistrationForm />,
      },
      {
        path: 'success',
        element: <Success />,
      },
      {
        path: 'validation',
        element: <ValidationToken />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorLayout />,
  },
]);

export default router;
