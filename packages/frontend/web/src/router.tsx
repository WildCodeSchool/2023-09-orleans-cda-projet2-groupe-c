import { createBrowserRouter } from 'react-router-dom';

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
    ],
  },
]);

export default router;
