import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useImmer } from 'use-immer';

import { DEFAULT_CONFIG } from '../../../constants/broad';
import generateCards from '../../../utils/board';
import { playerActions, playerSelectors } from '../../../state/ducks/player';
import { resultsActions } from '../../../state/ducks/results';
import { boardActions, boardSelectors } from '../../../state/ducks/board';
import Cards from '../../components/Cards/Cards';

const Board = ({ size, config }) => {
  const {
    selectBoard,
    selectIsInitialFlipped,
    selectIsBoardEmpty,
  } = boardSelectors;
  const { setBoard, setIsInitialFlipped } = boardActions;
  const { savePlayer } = resultsActions;
  const { addPoints, clearPoints } = playerActions;
  const { selectNickname, selectPoints } = playerSelectors;

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
    const updateSelectedCard = type =>
      setSelectedCard(draft => ({
        ...draft,
        [type]: { ...draft[type], card, index },
      }));

    const isSelectCard = type => type.index === -1 || type.index === index;
    const { first: firstCard, second: secondCard } = selectedCard;

    if (isSelectCard(firstCard)) {
      updateSelectedCard('first');
      return;
    }

    isSelectCard(secondCard) && updateSelectedCard('second');
  };

  const clearSelection = useCallback(() => {
    setSelectedCard(draft => {
      const initialSelectedObject = {
        card: '',
        index: -1,
      };

      return {
        ...draft,
        first: initialSelectedObject,
        second: initialSelectedObject,
      };
    });
  }, [setSelectedCard]);

  useEffect(() => {
    const { first: firstCard, second: secondCard } = selectedCard;

    if (firstCard.index === -1 || secondCard.index === -1) return;

    if (firstCard.card !== secondCard.card) {
      dispatch(addPoints(config.wrongAnswerPoints));

      const timeoutId = setTimeout(clearSelection, config.wrongAnswerFlipDelay);

      // eslint-disable-next-line consistent-return
      return () => {
        clearTimeout(timeoutId);
      };
    }

    const updateCardByType = type => ({ value: type.card, disabled: true });

    setCards(draft =>
      [...draft].map((card, index) => {
        switch (index) {
          case firstCard.index:
            return updateCardByType(firstCard);
          case secondCard.index:
            return updateCardByType(secondCard);
          default:
            return card;
        }
      }),
    );

    dispatch(addPoints(config.correctAnswerPoints));
    clearSelection();
  }, [
    dispatch,
    config,
    setCards,
    setSelectedCard,
    clearSelection,
    selectedCard,
    addPoints,
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
  }, [
    cards,
    dispatch,
    history,
    isBoardEmpty,
    points,
    nickname,
    setBoard,
    setIsInitialFlipped,
    savePlayer,
    clearPoints,
  ]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setIsInitialFlipped(false));
    }, config.initialDelayBeforeFlip);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, config, setIsInitialFlipped]);

  return (
    <Cards
      boardSize={size / 2}
      cards={cards}
      initialFlipped={isInitialFlipped}
      selectCard={selectCard}
      selected={selectedCard}
    />
  );
};

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

export default Board;
