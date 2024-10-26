import { combineReducers } from '@reduxjs/toolkit';

import authSlice from './auth/AuthSlice';
import authTransientReducer from './auth/AuthTransientReducer';

export const rootReducer = combineReducers({
  authState: authSlice,
  authTransientState:authTransientReducer
});

export type RootState = ReturnType<typeof rootReducer>;
