import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import Button from '../Button';
import { BUTTON_TYPES } from '../Button/Button';

const Form = ({ contact, loading, onCancel, onSave }) => {
  const [ currentContact, setCurrentContact ] = useState({});
  const [ errors, setErrors ] = useState({});

  const onSaveContact = () => {
    const errs = { hasErrors: false };

    if (!currentContact) {
      errs.hasErrors = true;
    }
    if (!currentContact.name) {
      errs.hasErrors = true;
      errs.name = true;
    }
    if (!currentContact.lastname) {
      errs.hasErrors = true;
      errs.lastname = true;
    }
    if (!currentContact.email) {
      errs.hasErrors = true;
      errs.email = true;
    }
    if (!currentContact.telephone) {
      errs.hasErrors = true;
      errs.telephone = true;
    }

    if (errs.hasErrors) {
      setErrors(errs);
    } else {
      onSave(currentContact);
    }
  };

  useEffect(() => {
    if (contact !== currentContact) {
      setCurrentContact(contact || {});
    }
  }, [ contact ]);

  return (
    <form className="contact-form">
      <Input
        disabled={loading}
        icon="fas fa-signature"
        placeholder="Name"
        value={currentContact?.name}
        onChange={(value) => setCurrentContact({ ...currentContact, name: value })}
      />
      <Input
        disabled={loading}
        icon="fas fa-signature"
        placeholder="Lastname"
        value={currentContact?.lastname}
        onChange={(value) => setCurrentContact({ ...currentContact, lastname: value })}
      />
      <Input
        disabled={loading}
        icon="fas fa-at"
        placeholder="Email"
        value={currentContact?.email}
        onChange={(value) => setCurrentContact({ ...currentContact, email: value })}
      />
      <Input
        disabled={loading}
        icon="fas fa-phone"
        placeholder="Telephone"
        value={currentContact?.telephone}
        onChange={(value) => setCurrentContact({ ...currentContact, telephone: value })}
      />
      {errors && errors.hasErrors && (
        <div className="user-error-container">
          <div className="user-error">
            <p>Errors on:</p>
            <ul>{Object.keys(errors).map((key) => ('hasErrors' !== key ? <li>{key}</li> : null))}</ul>
          </div>
        </div>
      )}
      <div className="contact-form-buttons">
        <Button disabled={loading} onClick={onSaveContact} text="Create" />
        <Button disabled={loading} onClick={onCancel} text="Cancel" type={BUTTON_TYPES.PRIMARY_INV} />
      </div>
    </form>
  );
};

Form.defaultProps = {
  contact: null,
  loading: false,
};

Form.propTypes = {
  contact: PropTypes.object,
  loading: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Form;
