import React from 'react';
import PropTypes from 'prop-types';
import Form from '../Form';

const Modal = ({ contact, loading, onHide, onSave }) => (
  <div className="modal-container">
    <button type="button" className="modal-shadow fadein" onClick={() => !loading && onHide()}>
      {' '}
    </button>
    <div className="fadein modal">
      <div className="modal-header">
        <span>{contact?._id ? 'Edit' : 'Add'}</span>
      </div>
      <div className="modal-body">
        <Form contact={contact} loading={loading} onCancel={onHide} onSave={onSave} />
      </div>
    </div>
  </div>
);

Modal.defaultProps = {
  contact: null,
  loading: false,
};

Modal.propTypes = {
  contact: PropTypes.object,
  loading: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Modal;
