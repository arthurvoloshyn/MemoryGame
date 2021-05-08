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

import playerReducer from '../features/player/playerSlice';
import boardReducer from '../features/board/boardSlice';
import resultsReducer from '../features/results/resultsSlice';

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
});
