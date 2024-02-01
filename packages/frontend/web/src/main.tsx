import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import AuthContext from './contexts/AuthContext.tsx';
import InteractionContext from './contexts/InteractionContext.tsx';
import { ThemeContext } from './contexts/ThemeContext.tsx';
import './globals.css';
import router from './router.tsx';

const rootElement = document.querySelector('#root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AuthContext>
        <ThemeContext>
          <InteractionContext>
            <RouterProvider router={router} />
          </InteractionContext>
        </ThemeContext>
      </AuthContext>
    </React.StrictMode>,
  );
}
