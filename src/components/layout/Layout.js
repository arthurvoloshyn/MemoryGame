import React from 'react';
import PropTypes from 'prop-types';

import styles from './Layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};
