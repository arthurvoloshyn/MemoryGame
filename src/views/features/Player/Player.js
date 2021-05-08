import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { playerActions, playerSelectors } from '../../../state/ducks/player';

import styles from './Player.module.css';
import Button from '../../components/Button/Button';

const Player = () => {
  const { selectNickname } = playerSelectors;
  const { setNickname } = playerActions;

  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isNicknameTouched, setIsNicknameTouched] = useState(false);
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const cachedNickname = useSelector(selectNickname);

  const setNicknameSuccessStatus = (valid = true, errorMessage = false) => {
    setIsNicknameValid(valid);
    setNicknameErrorMessage(errorMessage);
  };

  const validateNickname = ({ currentTarget: { value: nickname } }) => {
    setIsNicknameTouched(true);

    const shortNickname = nickname.length < 3;
    const longNickname = nickname.length > 32;

    if (shortNickname || longNickname) {
      const errorMessage = shortNickname
        ? 'Nickname is too short.'
        : 'Nickname is too long.';
      setNicknameSuccessStatus(false, errorMessage);
      return;
    }

    setNicknameSuccessStatus();
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!isNicknameValid && isNicknameTouched) return;

    const { nickname } = e.currentTarget.elements;

    dispatch(setNickname(nickname.value));

    history.push('/game');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="nickname-input">
        Nickname
      </label>
      <input
        className={styles.input}
        defaultValue={cachedNickname}
        id="nickname-input"
        name="nickname"
        onChange={validateNickname}
      />
      <div className={styles.error}>
        {isNicknameTouched && nicknameErrorMessage}
      </div>
      <Button type="submit">Start game</Button>
    </form>
  );
};

export default Player;