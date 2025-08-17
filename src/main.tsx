import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { RouterProvider } from 'react-router';
import router from './routes/routes.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { Toaster } from 'sonner';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { AppWrapper } from './pages/shared/PageMeta.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <ThemeProvider>
          <AppWrapper>
            <RouterProvider router={router} />
          </AppWrapper>
        </ThemeProvider>
      </Provider>
    </GoogleOAuthProvider>
    <Toaster richColors position="top-center" />
  </StrictMode>
);
