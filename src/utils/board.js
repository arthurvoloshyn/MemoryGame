import { AVAILABLE_CARDS } from '../constants/broad';
import { shuffleArray } from './helpers';

const generateCards = size => {
  const cardsNumber = +size;

  if (Number.isNaN(cardsNumber) || cardsNumber <= 0) {
    throw Error(
      `Board size must be number from 0 to ${AVAILABLE_CARDS.length}.`,
    );
  }

  if (cardsNumber > AVAILABLE_CARDS.length) {
    throw Error(`Board size cannot be greater than ${AVAILABLE_CARDS.length}.`);
  }

  const copyAvailableCards = [...AVAILABLE_CARDS];

  shuffleArray(copyAvailableCards);

  const slicedCards = copyAvailableCards.slice(0, size);
  const duplicatedCards = [...slicedCards, ...slicedCards];

  shuffleArray(duplicatedCards);

  return duplicatedCards;
};

export default generateCards;
