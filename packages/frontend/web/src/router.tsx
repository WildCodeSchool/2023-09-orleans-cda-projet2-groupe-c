import { createBrowserRouter } from 'react-router-dom';

import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import Success from './components/auth/Success';
import HomeButtons from './components/home/HomeButtons';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <HomeButtons />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/registration',
        element: <Registration />,
      },
      {
        path: '/registration/success',
        element: <Success />,
      },
    ],
  },
]);

export default router;
