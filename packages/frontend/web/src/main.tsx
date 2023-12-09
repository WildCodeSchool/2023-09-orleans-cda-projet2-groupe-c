import React from 'react';
import ReactDOM from 'react-dom/client';

import AuthProvider from './contexts/AuthContext.tsx';
import { ThemeContext } from './contexts/ThemeContext.tsx';
import './globals.css';
import AppRouter from './router.tsx';

const rootElement = document.querySelector('#root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ThemeContext>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </ThemeContext>
    </React.StrictMode>,
  );
}
