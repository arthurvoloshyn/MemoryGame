import { createSlice } from '@reduxjs/toolkit';

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    isInitialFlipped: true,
    board: [],
  },
  reducers: {
    setIsInitialFlipped: (state, { payload }) => {
      state.isInitialFlipped = payload;
    },
    setBoard: (state, { payload }) => {
      state.board = payload;
    },
  },
});

export default boardSlice.reducer;
