export const selectIsInitialFlipped = ({ board: { isInitialFlipped } }) =>
  isInitialFlipped;
export const selectBoard = ({ board: { board } }) => board;
export const selectIsBoardEmpty = ({ board: { board } }) => {
  const filteredBoard = board.filter(
    currentCard => typeof currentCard === 'string',
  );
  return filteredBoard.length === 0;
};

export default {
  selectIsInitialFlipped,
  selectBoard,
  selectIsBoardEmpty,
};
