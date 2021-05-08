import { createSlice } from '@reduxjs/toolkit';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    nickname: '',
    points: 0,
  },
  reducers: {
    addPoints: (state, action) => ({
      ...state,
      points: state.points + action.payload,
    }),
    clearPoints: state => ({ ...state, points: 0 }),
    setNickname: (state, action) => ({ ...state, nickname: action.payload }),
  },
});

export const {
  addPoints,
  setNickname,
  setBoard,
  clearPoints,
} = playerSlice.actions;

export const selectNickname = state => state.player.nickname;
export const selectPoints = state => state.player.points;

export default playerSlice.reducer;
