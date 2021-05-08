import { createSlice } from '@reduxjs/toolkit';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    nickname: '',
    points: 0,
  },
  reducers: {
    addPoints: (state, { payload }) => ({
      ...state,
      points: state.points + payload,
    }),
    clearPoints: state => ({ ...state, points: 0 }),
    setNickname: (state, { payload }) => ({ ...state, nickname: payload }),
  },
});

export const {
  addPoints,
  setNickname,
  setBoard,
  clearPoints,
} = playerSlice.actions;

export const selectNickname = ({ player: { nickname } }) => nickname;
export const selectPoints = ({ player: { points } }) => points;

export default playerSlice.reducer;
