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
import playerReducer from '../features/Player/playerSlice';
import boardReducer from '../features/Board/boardSlice';
import resultsReducer from '../features/Results/resultsSlice';

export default configureStore({
  reducer: persistReducer(
    {
      key: 'store',
      storage,
    },
    combineReducers({
      player: playerReducer,
      board: boardReducer,
      results: resultsReducer,
    }),
  ),
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  devTools: ENV.IS_DEV,
});
