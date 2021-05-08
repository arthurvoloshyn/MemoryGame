import { createSlice } from '@reduxjs/toolkit';

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    isInitialFlipped: true,
    board: [],
  },
  reducers: {
    setIsInitialFlipped: (state, { payload }) => ({
      ...state,
      isInitialFlipped: payload,
    }),
    setBoard: (state, { payload }) => ({ ...state, board: payload }),
  },
});

export const { setIsInitialFlipped, setBoard } = boardSlice.actions;

export const selectIsInitialFlipped = ({ board: { isInitialFlipped } }) =>
  isInitialFlipped;
export const selectBoard = ({ board: { board } }) => board;
export const selectIsBoardEmpty = ({ board: { board } }) => {
  const filteredBoard = board.filter(
    currentCard => typeof currentCard === 'string',
  );
  return filteredBoard.length === 0;
};

export default boardSlice.reducer;
