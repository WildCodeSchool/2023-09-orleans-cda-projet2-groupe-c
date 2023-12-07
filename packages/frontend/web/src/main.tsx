import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import AuthProvider from './contexts/AuthContext.tsx';
import { ThemeContext } from './contexts/ThemeContext.tsx';
import './globals.css';
import router from './router.tsx';

const rootElement = document.querySelector('#root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ThemeContext>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeContext>
    </React.StrictMode>,
  );
}
