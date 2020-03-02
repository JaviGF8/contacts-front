import React, { useEffect, useState } from 'react';
import { getAllContacts, createContact, deleteContact, updateContact } from '../actions/contacts';
import Modal from '../components/Modal';
import List from '../components/List';
import Options from '../components/Options';
import Toast from '../components/Toast/Toast';

const Main = () => {
  const [ contact, setContact ] = useState(null);
  const [ contacts, setContacts ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ loadingSave, setLoadingSave ] = useState(true);
  const [ mounted, setMounted ] = useState(false);
  const [ showModal, setShowModal ] = useState(false);
  const [ showToast, setShowToast ] = useState(false);
  const [ toastText, setToastText ] = useState(false);

  const reload = () => {
    setLoading(true);
    getAllContacts().then(({ data }) => {
      setContacts(data);
    });
  };

  const newToast = (text) => {
    setShowToast(true);
    setToastText(text);
  };

  const onSave = (newContact) => {
    setLoadingSave(true);
    let funcToExecute = createContact;

    if (newContact._id) {
      funcToExecute = updateContact;
    }
    funcToExecute(newContact)
      .then(() => {
        reload();
        setContact(null);
        newToast(`Contact ${newContact._id ? 'updated' : 'created'} successfully`);
      })
      .catch(() => {
        newToast('Error on contact');
      });
  };

  const onDelete = (contactId) => {
    deleteContact(contactId)
      .then(() => {
        reload();
        setContact(null);
        newToast('Contact removed');
      })
      .catch(() => {
        newToast('Error on contact');
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

  useEffect(() => {
    if (showToast) {
      setTimeout(() => setShowToast(false), 5000);
    }
    setLoadingSave(false);
  }, [ showToast ]);

  return (
    <main>
      <div id="main-container">
        <h1 className="box shadow">My contacts</h1>
        <Options onAdd={() => setContact({})} onEdit={setContact} />
        <List contacts={contacts} loading={loading} onDelete={onDelete} onEdit={setContact} />
        {showModal && <Modal contact={contact} loading={loadingSave} onHide={() => setContact(null)} onSave={onSave} />}
        <Toast show={showToast} text={toastText} />
      </div>
    </main>
  );
};

export default Main;
