import React from 'react';

import styles from './Leaderboards.module.css';
import Results from '../../features/results/Results';

export default function Leaderboards() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Leaderboard</h1>
      <Results />
    </div>
  );
}
