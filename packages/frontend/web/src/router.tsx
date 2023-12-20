import { createBrowserRouter } from 'react-router-dom';

import RegistrationForm from './components/auth/RegistrationForm';
import Success from './components/auth/Success';
import ValidationToken from './components/auth/ValidationToken';
import AuthLayout from './components/AuthLayout';
import Login from './components/auth/Login';
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
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
  {
    path: '/registration',
    element: <Registration />,
    children: [
      {
        path: '/registration/',
        element: <RegistrationForm />,
      },
      {
        path: '/registration/validation',
        element: <Success />,
      },
      {
        path: '/registration/success',
        element: <ValidationToken />,
      },
    ],
  },
]);

export default router;
