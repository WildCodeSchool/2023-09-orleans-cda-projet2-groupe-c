import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import AuthContext from './contexts/AuthContext.tsx';
import InteractionContext from './contexts/InteractionContext.tsx';
import PreferenceContext from './contexts/PreferenceContext.tsx';
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
            <PreferenceContext>
              <RouterProvider router={router} />
            </PreferenceContext>
          </InteractionContext>
        </ThemeContext>
      </AuthContext>
    </React.StrictMode>,
  );
}
