import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from './components/AuthLayout';
import Login from './components/auth/Login';
import RegistrationForm from './components/auth/RegistrationForm';
import Success from './components/auth/Success';
import ValidationToken from './components/auth/ValidationToken';
import ErrorLayout from './components/error/ErrorLayout';
import HomeCards from './components/home/HomeCards';
import ProfileInteractionLayout from './components/user-interaction/ProfileInteractionLayout';
import FormProfile from './pages/FormProfile';
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
            element: <HomeCards />,
          },
          {
            path: '/profile/interactions',
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
      {
        path: '/registration/profile',
        element: <FormProfile />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorLayout />,
  },
]);

export default router;
