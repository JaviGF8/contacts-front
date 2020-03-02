import React from 'react';
import PropTypes from 'prop-types';

const Toast = ({ show, text, ...rest }) => (
  <div {...rest} className={`custom-toast shadow${show ? ' show' : ''}`}>
    {text}
  </div>
);

Toast.defaultProps = {
  show: false,
  text: null,
};

Toast.propTypes = {
  show: PropTypes.bool,
  text: PropTypes.string,
};

export default Toast;
