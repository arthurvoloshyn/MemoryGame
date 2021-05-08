import React from 'react';
import PropTypes from 'prop-types';

import Card from '../card/Card';
import styles from './Cards.module.css';

export default function Cards({
  cards,
  initialFlipped,
  selected,
  boardSize,
  selectCard,
}) {
  return (
    <div
      className={styles.container}
      style={{
        gridTemplate: `repeat(${boardSize}, 1fr) / repeat(${boardSize}, 1fr)`,
        height: `calc(${boardSize}*100px)`,
      }}
    >
      {cards.map((card, i) => {
        return (
          <Card
            key={`${card}_${i}`}
            isDisabled={card.disabled}
            isFlipped={
              initialFlipped ||
              selected.first.index === i ||
              selected.second.index === i
            }
            selectCard={() => selectCard(card, i)}
            value={card}
          />
        );
      })}
    </div>
  );
}

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
