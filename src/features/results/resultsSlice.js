import { createSlice } from '@reduxjs/toolkit';

export const resultsSlice = createSlice({
  name: 'results',
  initialState: {
    results: [],
  },
  reducers: {
    savePlayer: (state, action) => {
      state.results.push(action.payload);
    },
  },
});

export const { savePlayer } = resultsSlice.actions;

export const selectResults = state => state.results.results;
export const selectSortedResults = state =>
  state.results.results.slice().sort(({ points: a }, { points: d }) => d - a);

export default resultsSlice.reducer;
