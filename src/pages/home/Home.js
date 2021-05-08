import React from 'react';

import Player from '../../features/player/Player';

import styles from './Home.module.css';

const Home = () => (
  <div className={styles.container}>
    <h1>Memory game</h1>
    <Player />
  </div>
);

export default Home;
