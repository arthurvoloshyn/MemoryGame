export const AVAILABLE_CARDS = [
  '😀',
  '🥶',
  '🥳',
  '🤡',
  '👻',
  '🤖',
  '💚',
  '💣',
  '💤',
  '👋',
  '💅',
  '🧠',
  '👀',
  '🙋‍♀️',
  '🐶',
  '🦄',
  '🐷',
  '🦆',
  '🐛',
  '🍎',
  '🍉',
  '🍆',
  '🍿',
  '🍪',
  '🍭',
  '🍾',
  '🏖',
  '🚕',
  '🚀',
  '⭐',
  '🎁',
];

export const DEFAULT_CONFIG = {
  wrongAnswerPoints: -100,
  correctAnswerPoints: 200,
  initialDelayBeforeFlip: 2000,
  wrongAnswerFlipDelay: 1000,
};

// credits: https://stackoverflow.com/a/6274381
const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const generateCards = size => {
  const cardsNumber = Number(size);

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
  const duplicatedCards = slicedCards.concat(slicedCards);

  shuffleArray(duplicatedCards);

  return duplicatedCards;
};
