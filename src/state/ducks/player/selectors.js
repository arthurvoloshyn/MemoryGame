export const selectNickname = ({ player: { nickname } }) => nickname;
export const selectPoints = ({ player: { points } }) => points;

export default {
  selectNickname,
  selectPoints,
};
