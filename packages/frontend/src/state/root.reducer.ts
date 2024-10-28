import { combineReducers } from '@reduxjs/toolkit';

import authSlice from './auth.slice';
import homeSlice from './home.slice';

export const rootReducer = combineReducers({
  authState: authSlice,
  homeState: homeSlice,
});
