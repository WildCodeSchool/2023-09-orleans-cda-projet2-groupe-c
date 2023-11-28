import { createBrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Start from './pages/Start';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Start />,
  },
  {
    path: '/home',
    element: <Home />,
  },
]);

export default router;
