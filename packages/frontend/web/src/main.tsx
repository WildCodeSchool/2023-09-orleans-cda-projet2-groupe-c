import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import AuthContext from './contexts/AuthContext.tsx';
import ConversationContext from './contexts/ConversationContext.tsx';
import InteractionContext from './contexts/InteractionContext.tsx';
import MatchingContext from './contexts/MatchingContext.tsx';
import PreferenceContext from './contexts/PreferenceContext.tsx';
import { ThemeContext } from './contexts/ThemeContext.tsx';
import UsersInteractionsContext from './contexts/UsersInteractionsContext.tsx';
import './globals.css';
import router from './router.tsx';

const rootElement = document.querySelector('#root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AuthContext>
        <ThemeContext>
          <ConversationContext>
            <MatchingContext>
              <InteractionContext>
                <PreferenceContext>
                  <UsersInteractionsContext>
                    <RouterProvider router={router} />
                  </UsersInteractionsContext>
                </PreferenceContext>
              </InteractionContext>
            </MatchingContext>
          </ConversationContext>
        </ThemeContext>
      </AuthContext>
    </React.StrictMode>,
  );
}
