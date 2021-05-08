import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useImmer } from 'use-immer';

import {
  addPoints,
  clearPoints,
  selectNickname,
  selectPoints,
} from '../player/playerSlice';
import { savePlayer } from '../results/resultsSlice';
import {
  selectIsInitialFlipped,
  setIsInitialFlipped,
  setBoard,
  selectBoard,
  selectIsBoardEmpty,
} from './boardSlice';
import { generateCards, DEFAULT_CONFIG } from './Board.utils';
import Cards from '../../components/cards/Cards';

export default function Board({ size, config }) {
  const board = useSelector(selectBoard);
  const isInitialFlipped = useSelector(selectIsInitialFlipped);
  const isBoardEmpty = useSelector(selectIsBoardEmpty);
  const nickname = useSelector(selectNickname);
  const points = useSelector(selectPoints);
  const dispatch = useDispatch();
  const history = useHistory();
  const [cards, setCards] = useImmer(() =>
    isBoardEmpty ? generateCards(size) : board,
  );
  const [selectedCard, setSelectedCard] = useImmer({
    first: { card: '', index: -1 },
    second: { card: '', index: -1 },
  });

  const selectCard = (card, index) => {
    if (selectedCard.first.index === -1 || selectedCard.first.index === index) {
      setSelectedCard(draft => {
        draft.first.card = card;
        draft.first.index = index;
      });
      return;
    }

    if (
      selectedCard.second.index === -1 ||
      selectedCard.second.index === index
    ) {
      setSelectedCard(draft => {
        draft.second.card = card;
        draft.second.index = index;
      });
    }
  };

  const clearSelection = useCallback(() => {
    setSelectedCard(draft => {
      const initialSelectedObject = {
        card: '',
        index: -1,
      };

      draft.first = initialSelectedObject;
      draft.second = initialSelectedObject;
    });
  }, [setSelectedCard]);

  useEffect(() => {
    const { first: firstCard, second: secondCard } = selectedCard;

    if (firstCard.index === -1 || secondCard.index === -1) {
      return;
    }

    if (firstCard.card !== secondCard.card) {
      dispatch(addPoints(config.wrongAnswerPoints));

      const timeoutId = setTimeout(clearSelection, config.wrongAnswerFlipDelay);

      // eslint-disable-next-line consistent-return
      return () => {
        clearTimeout(timeoutId);
      };
    }

    setCards(draft => {
      draft[selectedCard.first.index] = {
        value: selectedCard.first.card,
        disabled: true,
      };
      draft[selectedCard.second.index] = {
        value: selectedCard.second.card,
        disabled: true,
      };
    });

    dispatch(addPoints(config.correctAnswerPoints));
    clearSelection();
  }, [
    selectedCard,
    dispatch,
    config,
    setCards,
    setSelectedCard,
    clearSelection,
  ]);

  useEffect(() => {
    if (isBoardEmpty && points > 0) {
      dispatch(savePlayer({ nickname, points }));
      dispatch(clearPoints());
      dispatch(setBoard(cards));
      dispatch(setIsInitialFlipped(true));

      history.push('/leaderboards');

      return;
    }

    dispatch(setBoard(cards));
  }, [cards, dispatch, history, isBoardEmpty, points, nickname]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setIsInitialFlipped(false));
    }, config.initialDelayBeforeFlip);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, config]);

  return (
    <Cards
      boardSize={size / 2}
      cards={cards}
      initialFlipped={isInitialFlipped}
      selectCard={selectCard}
      selected={selectedCard}
    />
  );
}

Board.propTypes = {
  size: PropTypes.number.isRequired,
  config: PropTypes.shape({
    wrongAnswerPoints: PropTypes.number.isRequired,
    correctAnswerPoints: PropTypes.number.isRequired,
    initialDelayBeforeFlip: PropTypes.number.isRequired,
    wrongAnswerFlipDelay: PropTypes.number.isRequired,
  }),
};

Board.defaultProps = {
  config: DEFAULT_CONFIG,
};
