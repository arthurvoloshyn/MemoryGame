import React from 'react';
import { useSelector } from 'react-redux';

import { selectSortedResults } from './resultsSlice';
import styles from './Results.module.css';

export default function Leaderboards() {
  const results = useSelector(selectSortedResults);

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.head} scope="col">
              Name
            </th>
            <th className={styles.head} scope="col">
              Points
            </th>
          </tr>
        </thead>
        <tbody>
          {results.length > 0 ? (
            results.map((player, i) => {
              return (
                <tr key={`${player.nickname}_${i}`} className={styles.row}>
                  <td className={styles.item}>{player.nickname}</td>
                  <td className={styles.item}>{player.points}</td>
                </tr>
              );
            })
          ) : (
            <div className={`${styles.row} ${styles.empty}`}>No data</div>
          )}
        </tbody>
      </table>
    </div>
  );
}
