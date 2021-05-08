import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './Button.module.css';

const Button = ({ children, className, ...attrs }) => {
  const Tag = attrs.to ? Link : 'button';

  return (
    <Tag {...attrs} className={className || styles.button}>
      {children}
    </Tag>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Button.defaultProps = {
  children: 'Simple title',
  className: '',
};

export default Button;
