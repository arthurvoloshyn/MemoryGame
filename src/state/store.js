import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { combineReducers } from 'redux';

import ENV from '../constants/environment';
import * as reducers from './ducks';

export default configureStore({
  reducer: persistReducer(
    {
      key: 'store',
      storage,
    },
    combineReducers(reducers),
  ),
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  devTools: ENV.IS_DEV,
});
