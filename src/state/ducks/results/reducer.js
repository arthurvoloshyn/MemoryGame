import { createSlice } from '@reduxjs/toolkit';

export const resultsSlice = createSlice({
  name: 'results',
  initialState: {
    results: [],
  },
  reducers: {
    savePlayer: (state, { payload }) => {
      state.results.push(payload);
    },
  },
});

export default resultsSlice.reducer;
