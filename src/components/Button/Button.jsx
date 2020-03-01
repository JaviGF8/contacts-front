import React from 'react';
import PropTypes from 'prop-types';

export const BUTTON_TYPES = {
  PRIMARY: 'primary',
  PRIMARY_INV: 'primary-inverted',
  SECONDARY: 'secondary',
  ERROR: 'error',
};

const Button = ({ className, disabled, text, type, ...rest }) => (
  <button
    className={`custom-btn${className ? ` ${className}` : ''} ${type}-btn`}
    disabled={disabled}
    type="button"
    {...rest}>
    {text}
  </button>
);

Button.defaultProps = {
  className: null,
  disabled: false,
  text: null,
  type: BUTTON_TYPES.PRIMARY,
};

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  text: PropTypes.string,
  type: PropTypes.oneOf(Object.values(BUTTON_TYPES)),
};

export default Button;
