import { createBrowserRouter } from 'react-router-dom';

import HomeButtons from './components/home/HomeButtons';
import Login from './components/home/Login';
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
