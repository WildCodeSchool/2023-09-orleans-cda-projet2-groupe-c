import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from './components/AuthLayout';
import Login from './components/auth/Login';
import RegistrationForm from './components/auth/RegistrationForm';
import Success from './components/auth/Success';
import ValidationToken from './components/auth/ValidationToken';
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
]);

export default router;
