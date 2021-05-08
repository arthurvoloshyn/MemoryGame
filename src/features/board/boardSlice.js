import { createSlice } from '@reduxjs/toolkit';

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    isInitialFlipped: true,
    board: [],
  },
  reducers: {
    setIsInitialFlipped: (state, action) => {
      state.isInitialFlipped = action.payload;
    },
    setBoard: (state, action) => {
      state.board = action.payload;
    },
  },
});

export const { setIsInitialFlipped, setBoard } = boardSlice.actions;

export const selectIsInitialFlipped = state => state.board.isInitialFlipped;
export const selectBoard = state => state.board.board;
export const selectIsBoardEmpty = state => {
  const filteredBoard = state.board.board.filter(
    currentCard => typeof currentCard === 'string',
  );
  return filteredBoard.length === 0;
};

export default boardSlice.reducer;
