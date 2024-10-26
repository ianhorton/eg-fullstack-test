import {
  ConfigureStoreOptions,
  EnhancedStore,
  configureStore,
  StoreEnhancer,
  Middleware,
} from '@reduxjs/toolkit';
import {
  PERSIST,
  PersistConfig,
  Persistor,
  REGISTER,
  persistReducer,
  persistStore,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// @ts-ignore
import { createLogger } from 'redux-logger';

import { createEpicMiddleware } from 'redux-observable';

import { rootReducer, RootState } from './RootReducer';

const storeFactory = (
  logRedux: boolean = false,
  middlewares: Middleware[] = [],
  enhancers?: StoreEnhancer<{}, {}>[],
): EnhancedStore<RootState> => {
  const epicMiddleware = createEpicMiddleware();
  middlewares.push(epicMiddleware);

  if (logRedux) {
    middlewares.push(createLogger());
  }

  const persistConfig: PersistConfig<RootState> = {
    key: 'root',
    storage: storage,
    blacklist: ['authTransientState'],
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const options = {
    serializableCheck: {
      ignoredActions: [REGISTER, PERSIST],
    },
  };

  const configureStoreOptions: ConfigureStoreOptions = {
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware(options).concat(middlewares),
    enhancers: (getDefaultEnhancers) =>
      getDefaultEnhancers().concat(enhancers ?? []),
  };

  const store = configureStore(configureStoreOptions);

  //epicMiddleware.run(rootEpic);

  return store;
};

const persistorFactory = <TRootState>(
  store: EnhancedStore<TRootState>,
): Persistor => {
  return persistStore(store, null, () => {
    store.dispatch({ type: 'bootstrap' });
  });
};

export { storeFactory, persistorFactory };
