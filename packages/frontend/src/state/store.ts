import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter.slice';

// @ts-ignore
import { createLogger } from 'redux-logger';
import { rootReducer } from './root.reducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([createLogger()]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;