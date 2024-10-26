import React from 'react';
import { Route, Routes } from 'react-router-dom';

//import RequiresSignIn from './RequiresSignIn';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import NotFound from '../screens/NotFound';
import Home from '../screens/Home';

export default function AppRoutes() {
  return (
    <Routes>
  
      <Route
        path="/"
        element={
          //<RequiresSignIn>
            <Home />
          //</RequiresSignIn>
        }
      />

      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      {/* Finally, catch all unmatched routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
