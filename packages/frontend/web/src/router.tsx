import { createBrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import ValidationToken from './components/auth/ValidationToken';
import Registration from './components/auth/Registration';
import Success from './components/auth/Success';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/registration',
        element: <Registration />
      },
      {
        path: '/registration/success',
        element: <Success />
      },
      {
        path: '/registration/validation',
        element: <ValidationToken />
      }
    ]
  },
]);

export default router;
