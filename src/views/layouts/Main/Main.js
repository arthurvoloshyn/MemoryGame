import React from 'react';
import PropTypes from 'prop-types';

import styles from './Main.module.css';

const Main = ({ children }) => (
  <div className={styles.container}>
    <div className={styles.content}>{children}</div>
  </div>
);

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
