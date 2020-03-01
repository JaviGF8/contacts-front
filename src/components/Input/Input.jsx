import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

const Input = ({ className, disabled, icon, maxLength, onChange, value, ...rest }) => {
  const [ inputValue, setInputValue ] = useState('');
  const [ focused, setFocused ] = useState('');

  useEffect(() => {
    setInputValue(value);
  }, [ value ]);

  return (
    <div
      className={`custom-input${className ? ` ${className}` : ''}${disabled ? ' disabled' : ''}${
        focused ? ' focused' : ''
      }`}>
      {icon && <Icon icon={icon} />}
      <input
        {...rest}
        disabled={disabled}
        onChange={({ target: { value: val } }) => {
          if (maxLength && val > maxLength) {
            val = val.substring(0, maxLength);
          }

          setInputValue(val);
          onChange(val);
        }}
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        value={inputValue}
      />
    </div>
  );
};

Input.defaultProps = {
  className: null,
  disabled: false,
  icon: null,
  maxLength: null,
  onChange: () => true,
  value: '',
};

Input.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.any,
};

export default Input;
