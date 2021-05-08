import React from 'react';

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
            value={card}
            isFlipped={
              initialFlipped ||
              selected.first.index === i ||
              selected.second.index === i
            }
            isDisabled={card.disabled}
            selectCard={() => selectCard(card, i)}
          />
        );
      })}
    </div>
  );
}
