import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import Button from '../Button';
import { BUTTON_TYPES } from '../Button/Button';

const Form = ({ contact, onCancel, onSave }) => {
  const [ currentContact, setCurrentContact ] = useState({});

  useEffect(() => {
    if (contact !== currentContact) {
      setCurrentContact(contact || {});
    }
  }, [ contact ]);

  return (
    <form className="contact-form">
      <Input
        icon="fas fa-signature"
        placeholder="Name"
        value={currentContact?.name}
        onChange={(value) => setCurrentContact({ ...currentContact, name: value })}
      />
      <Input
        icon="fas fa-signature"
        placeholder="Lastname"
        value={currentContact?.lastname}
        onChange={(value) => setCurrentContact({ ...currentContact, lastname: value })}
      />
      <Input
        icon="fas fa-at"
        placeholder="Email"
        value={currentContact?.email}
        onChange={(value) => setCurrentContact({ ...currentContact, email: value })}
      />
      <Input
        icon="fas fa-phone"
        placeholder="Telephone"
        value={currentContact?.telephone}
        onChange={(value) => setCurrentContact({ ...currentContact, telephone: value })}
      />
      <div className="contact-form-buttons">
        <Button onClick={() => onSave(currentContact)} text="Create" />
        <Button onClick={onCancel} text="Cancel" type={BUTTON_TYPES.PRIMARY_INV} />
      </div>
    </form>
  );
};

Form.defaultProps = {
  contact: null,
};

Form.propTypes = {
  contact: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Form;
