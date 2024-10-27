import React from 'react';
import { Route, Routes } from 'react-router-dom';

import RequiresSignIn from './requires-sign-in';
import SignIn from '../screens/sign-in';
import SignUp from '../screens/sign-up';
import NotFound from '../screens/not-found';
import Home from '../screens/home';

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequiresSignIn>
            <Home />
          </RequiresSignIn>
        }
      />

      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      {/* Finally, catch all unmatched routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
