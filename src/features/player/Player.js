import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Player.module.css';
import { setNickname, selectNickname } from './playerSlice';

export function Player() {
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isNicknameTouched, setIsNicknameTouched] = useState(false);
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const cachedNickname = useSelector(selectNickname);

  const validateNickname = e => {
    const nickname = e.currentTarget.value;
    setIsNicknameTouched(true);

    if (nickname.length < 3) {
      setIsNicknameValid(false);
      setNicknameErrorMessage('Nickname is too short.');
      return;
    }

    if (nickname.length > 32) {
      setIsNicknameValid(false);
      setNicknameErrorMessage('Nickname is too long.');
      return;
    }

    setIsNicknameValid(true);
    setIsNicknameTouched(false);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!isNicknameValid && isNicknameTouched) {
      return;
    }

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
        name="nickname"
        id="nickname-input"
        onChange={validateNickname}
        defaultValue={cachedNickname}
      />
      <div className={styles.error}>
        {isNicknameTouched && nicknameErrorMessage}
      </div>
      <button className={styles.button} type="submit">
        Start game
      </button>
    </form>
  );
}
