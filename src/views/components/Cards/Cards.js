import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card/Card';

import styles from './Cards.module.css';

const Cards = ({
  cards,
  initialFlipped,
  selected: { first: firstSelected, second: secondSelected },
  boardSize,
  selectCard,
}) => {
  const containerStyles = {
    gridTemplate: `repeat(${boardSize}, 1fr) / repeat(${boardSize}, 1fr)`,
    height: `calc(${boardSize}*100px)`,
  };

  return (
    <div className={styles.container} style={containerStyles}>
      {cards.map((card, i) => {
        const handleSelectCard = () => selectCard(card, i);
        const isFlipped =
          initialFlipped ||
          firstSelected.index === i ||
          secondSelected.index === i;

        return (
          <Card
            key={`${card}_${i}`}
            isDisabled={card.disabled}
            isFlipped={isFlipped}
            selectCard={handleSelectCard}
            value={card}
          />
        );
      })}
    </div>
  );
};

Cards.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ disabled: PropTypes.bool }),
    ]),
  ),
  initialFlipped: PropTypes.bool,
  selected: PropTypes.shape({
    first: PropTypes.shape({ card: PropTypes.string, index: PropTypes.number }),
    second: PropTypes.shape({
      card: PropTypes.string,
      index: PropTypes.number,
    }),
  }).isRequired,
  boardSize: PropTypes.number,
  selectCard: PropTypes.func,
};

Cards.defaultProps = {
  cards: [],
  initialFlipped: false,
  boardSize: 0,
  selectCard: () => {},
};

export default Cards;
