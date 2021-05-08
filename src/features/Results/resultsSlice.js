import { createSlice } from '@reduxjs/toolkit';

export const resultsSlice = createSlice({
  name: 'results',
  initialState: {
    results: [],
  },
  reducers: {
    savePlayer: (state, { payload }) => ({
      ...state,
      results: [...state.results, payload],
    }),
  },
});

export const { savePlayer } = resultsSlice.actions;

export const selectResults = ({ results: { results } }) => results;
export const selectSortedResults = ({ results: { results } }) =>
  results.slice().sort(({ points: a }, { points: d }) => d - a);

export default resultsSlice.reducer;
