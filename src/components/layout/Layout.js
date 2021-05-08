import React from 'react';
import PropTypes from 'prop-types';

import styles from './Layout.module.css';

const Layout = ({ children }) => (
  <div className={styles.container}>
    <div className={styles.content}>{children}</div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
