import React from 'react';
import Player from '../../features/player/Player';

import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Mini-memory game</h1>
      <Player />
    </div>
  );
}
