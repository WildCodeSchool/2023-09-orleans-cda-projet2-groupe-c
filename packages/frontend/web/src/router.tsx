import { createBrowserRouter } from 'react-router-dom';

import FormProfile from './pages/FormProfile';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/register',
    element: <FormProfile />,
  },
]);

export default router;
