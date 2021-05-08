import React from 'react';

import styles from './Preloader.module.css';

const Preloader = () => (
  <div className={styles.container}>
    <h1 className={styles.heading}>Loading...</h1>
  </div>
);

export default Preloader;
