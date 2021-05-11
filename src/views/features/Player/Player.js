import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { playerActions, playerSelectors } from '../../../state/ducks/player';

import styles from './Player.module.css';
import Button from '../../components/Button/Button';

const Player = () => {
  const { selectNickname } = playerSelectors;
  const { setNickname } = playerActions;

  const cachedNickname = useSelector(selectNickname);
  const [nicknameField, setNicknameField] = useState(cachedNickname);
  const [isNicknameTouched, setIsNicknameTouched] = useState(false);
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const validateNickname = nickname => {
    setIsNicknameTouched(true);

    const shortNickname = nickname.length < 3;
    const longNickname = nickname.length > 32;

    if (shortNickname || longNickname) {
      const errorMessage = shortNickname
        ? 'Nickname is too short.'
        : 'Nickname is too long.';
      setNicknameErrorMessage(errorMessage);
      return false;
    }

    setNicknameErrorMessage(false);
    return true;
  };

  const handleChange = ({ target: { value: nickname } }) => {
    setNicknameField(nickname);
    validateNickname(nickname);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const isNicknameValid = validateNickname(nicknameField);
    if (!isNicknameValid) return;

    dispatch(setNickname(nicknameField));

    history.push('/game');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="nickname-input">
        Nickname
      </label>
      <input
        className={styles.input}
        id="nickname-input"
        name="nickname"
        onChange={handleChange}
        value={nicknameField}
      />
      <div className={styles.error}>
        {isNicknameTouched && nicknameErrorMessage}
      </div>
      <Button type="submit">Start game</Button>
    </form>
  );
};

export default Player;
