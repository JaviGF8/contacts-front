import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Input from '../Input';
import { BUTTON_TYPES } from '../Button/Button';

const Modal = ({ onAdd, onFilter }) => (
  <div className="navbar shadow">
    <div>
      <h1>My contacts</h1>
      <div className="options">
        <Input icon="fas fa-search" placeholder="Filter" onChange={onFilter} />
        <Button onClick={onAdd} text="Add contact" type={BUTTON_TYPES.SECONDARY} />
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default Modal;
