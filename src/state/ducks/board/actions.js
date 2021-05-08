import { boardSlice } from './reducer';

export const { setIsInitialFlipped, setBoard } = boardSlice.actions;

export default {
  setIsInitialFlipped,
  setBoard,
};
