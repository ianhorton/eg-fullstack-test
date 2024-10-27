import { combineReducers } from '@reduxjs/toolkit';

import authSlice from './AuthSlice';
//import authTransientReducer from './AuthTransientReducer';
import counterSlice from './counter-slice';

export const rootReducer = combineReducers({
  authState: authSlice,
  //authTransientState: authTransientReducer,
  counterState: counterSlice
});

//export type RootState = ReturnType<typeof rootReducer>;
