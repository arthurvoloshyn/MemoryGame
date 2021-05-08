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
  // Array is frozen by default, need to copy it. More here: https://stackoverflow.com/a/53420326
  state.results.results.slice().sort(({ points: a }, { points: d }) => d - a);

export default resultsSlice.reducer;
