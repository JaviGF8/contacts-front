import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { BUTTON_TYPES } from '../Button/Button';

const List = ({ contacts, loading, onDelete, onEdit }) => (
  <div className="contacts-list box shadow">
    <div className="contacts">
      {!loading && 0 < contacts?.length && (
        <div className="contact contact-header">
          <p>Name</p>
          <p>Lastname</p>
          <p>Email</p>
          <p>Telephone</p>
          <p>Actions</p>
        </div>
      )}
      {!loading &&
        0 < contacts?.length &&
        contacts.map((contact) => (
          <div className="contact fadein" key={contact._id}>
            <p>{contact.name}</p>
            <p>{contact.lastname}</p>
            <p>{contact.email}</p>
            <p>{contact.telephone}</p>
            <div className="contact-buttons">
              <Button onClick={() => onEdit(contact)} text="Edit" />
              <Button onClick={() => onDelete(contact._id)} text="Delete" type={BUTTON_TYPES.ERROR} />
            </div>
          </div>
        ))}
      {!loading && (!contacts || 0 >= contacts.length) && <div className="no-contacts">No contacts found</div>}
      {loading && <div className="loading">LOADING ...</div>}
    </div>
  </div>
);

List.defaultProps = {
  contacts: null,
  loading: false,
};

List.propTypes = {
  contacts: PropTypes.array,
  loading: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default List;
