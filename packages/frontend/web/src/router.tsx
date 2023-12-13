import { createBrowserRouter } from 'react-router-dom';

import HomeButtons from './components/home/HomeButtons';
import Interactions from './components/home/Interactions';
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
        path: '/interactions',
        element: <Interactions />,
      },
    ],
  },
]);

export default router;
