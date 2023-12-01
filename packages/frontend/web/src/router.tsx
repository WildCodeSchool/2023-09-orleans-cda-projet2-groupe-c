import { createBrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import RegisterProfile from './pages/RegisterProfile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/register',
    element: <RegisterProfile />,
  },
]);

export default router;
