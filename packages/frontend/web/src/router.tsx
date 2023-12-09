import { createBrowserRouter } from 'react-router-dom';

import HomeButtons from './components/home/HomeButtons';
import FormProfile from './pages/FormProfile';
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
    ],
  },
  {
    path: '/register',
    element: <FormProfile />,
  },
]);

export default router;
