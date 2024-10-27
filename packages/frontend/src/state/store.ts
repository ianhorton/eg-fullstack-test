import {
  configureStore,
  ConfigureStoreOptions,
  Middleware,
} from '@reduxjs/toolkit';

import { createEpicMiddleware } from 'redux-observable';

// @ts-ignore
import { createLogger } from 'redux-logger';
import { rootReducer } from './root.reducer';

import { rootEpic } from './root.epic';
import { ApiAdapter } from '../api/api-adapter';

import { EpicDependencies } from './epic-dependencies';

const epicDependencies: EpicDependencies = {
  api: new ApiAdapter(),
};

const middlewares: Middleware[] = [];
const epicMiddleware = createEpicMiddleware({
  dependencies: epicDependencies,
});
middlewares.push(epicMiddleware);

const logger = createLogger();
middlewares.push(logger);

const configureStoreOptions: ConfigureStoreOptions = {
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
};

export const store = configureStore(configureStoreOptions);
epicMiddleware.run(rootEpic);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
