import React from 'react';
import { useSelector } from 'react-redux';

import { selectSortedResults } from './resultsSlice';

import styles from './Results.module.css';

const Leaderboards = () => {
  const results = useSelector(selectSortedResults);
  const theads = ['Name', 'Points'];

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            {theads.map(thead => (
              <th key={thead} className={styles.head} scope="col">
                {thead}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.length ? (
            results.map(({ nickname, points }, i) => (
              <tr key={`${nickname}_${i}`} className={styles.row}>
                <td className={styles.item}>{nickname}</td>
                <td className={styles.item}>{points}</td>
              </tr>
            ))
          ) : (
            <div className={`${styles.row} ${styles.empty}`}>No data</div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboards;
