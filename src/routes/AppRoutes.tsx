import { SignedIn } from '@clerk/clerk-react';
import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';

import App from '../App';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import SavedTripsPage from '../pages/SavedTripsPage';
import TripPlannerPage from '../pages/TripPlannerPage';

const AppRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />} path="/">
          <Route index element={<TripPlannerPage />} />
          <Route element={<LoginPage />} path="/login" />
          <Route element={<RegisterPage />} path="/register" />
          <Route
            element={
              <SignedIn>
                <SavedTripsPage />
              </SignedIn>
            }
            path="/trips"
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
