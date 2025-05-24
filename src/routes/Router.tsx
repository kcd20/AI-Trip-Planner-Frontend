import { SignedIn } from '@clerk/clerk-react';
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import LoaderComponent from '../components/common/LoaderComponent/LoaderComponent';

const TripPlannerPage = lazy(() => import('../pages/TripPlannerPage'));
const SavedTripsPage = lazy(() => import('../pages/SavedTripsPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));

const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoaderComponent openLoader variant="spin" />}>
            <TripPlannerPage />
          </Suspense>
        ),
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<LoaderComponent openLoader variant="spin" />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: 'register',
        element: (
          <Suspense fallback={<LoaderComponent openLoader variant="spin" />}>
            <RegisterPage />
          </Suspense>
        ),
      },
      {
        path: 'trips',
        element: (
          <Suspense fallback={<LoaderComponent openLoader variant="spin" />}>
            <SignedIn>
              <SavedTripsPage />
            </SignedIn>
          </Suspense>
        ),
      },
    ],
  },
]);

export default Router;
