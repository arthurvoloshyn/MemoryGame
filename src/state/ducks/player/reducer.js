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

export default playerSlice.reducer;
