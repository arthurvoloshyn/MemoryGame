import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

import styles from './Error.module.css';

const Error = ({ title, description, subTitle }) => (
  <div className={styles.container}>
    <div className={styles.content}>
      {subTitle && <h2 className={styles.subheading}>{subTitle}</h2>}
      <h1 className={styles.heading}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <Button className={styles.link} to="/">
        Go back home
      </Button>
    </div>
  </div>
);

Error.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  subTitle: PropTypes.string,
};

Error.defaultProps = {
  title: '404',
  description: "We can't find the page you're looking for.",
  subTitle: '',
};

export default Error;
