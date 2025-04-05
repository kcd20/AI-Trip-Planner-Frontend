import { ClerkProvider } from '@clerk/clerk-react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { LoaderProvider } from './providers/LoaderProvider';
import AppRoutes from './routes/AppRoutes';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <LoaderProvider>
        <AppRoutes />
      </LoaderProvider>
    </ClerkProvider>
  </StrictMode>
);
