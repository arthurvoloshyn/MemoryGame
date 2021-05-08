import { playerSlice } from './reducer';

export const {
  addPoints,
  setNickname,
  setBoard,
  clearPoints,
} = playerSlice.actions;

export default {
  addPoints,
  setNickname,
  setBoard,
  clearPoints,
};
