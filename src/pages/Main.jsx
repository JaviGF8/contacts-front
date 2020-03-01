import React, { useEffect, useState } from 'react';
import { getAllContacts, createContact, deleteContact, updateContact } from '../actions/contacts';
import Modal from '../components/Modal';
import List from '../components/List';
import Options from '../components/Options';

const Main = () => {
  const [ contact, setContact ] = useState(null);
  const [ contacts, setContacts ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ mounted, setMounted ] = useState(false);
  const [ showModal, setShowModal ] = useState(false);

  const reload = () => {
    setLoading(true);
    getAllContacts().then(({ data }) => {
      setContacts(data);
    });
  };

  const onSave = (newContact) => {
    let funcToExecute = createContact;

    if (newContact._id) {
      funcToExecute = updateContact;
    }
    funcToExecute(newContact).then(() => {
      reload();
      setContact(null);
    });
  };

  const onDelete = (contactId) => {
    deleteContact(contactId).then(() => {
      reload();
      setContact(null);
    });
  };

  useEffect(() => {
    reload();
  }, []);

  useEffect(() => {
    if (mounted) {
      setLoading(false);
    } else {
      setMounted(true);
    }
  }, [ contacts ]);

  useEffect(() => {
    if (contact) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [ contact ]);

  return (
    <main>
      <div id="main-container">
        <h1 className="box shadow">My contacts</h1>
        <Options onAdd={() => setContact({})} onEdit={setContact} />
        <List contacts={contacts} loading={loading} onDelete={onDelete} onEdit={setContact} />
        {showModal && <Modal contact={contact} onHide={() => setContact(null)} onSave={onSave} />}
      </div>
    </main>
  );
};

export default Main;
