import React from 'react';
import { Route, Routes } from 'react-router-dom';

import RequiresSignIn from './requires-sign-in.guard';
import SignIn from '../screens/sign-in.screen';
import SignUp from '../screens/sign-up.screen';
import NotFound from '../screens/not-found.screen';
import Home from '../screens/home.screen';

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
