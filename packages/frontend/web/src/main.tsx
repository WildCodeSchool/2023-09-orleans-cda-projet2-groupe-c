import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import AuthContext from './contexts/AuthContext.tsx';
import HomeContext from './contexts/HomeContext.tsx';
import { ThemeContext } from './contexts/ThemeContext.tsx';
import './globals.css';
import router from './router.tsx';

const rootElement = document.querySelector('#root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AuthContext>
        <ThemeContext>
          <HomeContext>
            <RouterProvider router={router} />
          </HomeContext>
        </ThemeContext>
      </AuthContext>
    </React.StrictMode>,
  );
}
