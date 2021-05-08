export const selectResults = ({ results: { results } }) => results;
export const selectSortedResults = ({ results: { results } }) =>
  results.slice().sort(({ points: a }, { points: d }) => d - a);

export default {
  selectResults,
  selectSortedResults,
};
