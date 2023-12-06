import { createBrowserRouter } from 'react-router-dom';

import Login from './components/auth/Login';
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
    ],
  },
]);

export default router;
