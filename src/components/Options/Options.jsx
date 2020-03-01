import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

const Options = ({ onAdd }) => (
  <div className="options box shadow">
    <Button onClick={onAdd} text="Add" />
  </div>
);

Options.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default Options;
