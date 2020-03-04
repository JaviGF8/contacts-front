import React, { useEffect, useState } from 'react';
import { getAllContacts, createContact, deleteContact, updateContact } from '../actions/contacts';
import Modal from '../components/Modal';
import List from '../components/List';
import Navbar from '../components/Navbar';
import Toast from '../components/Toast';

const filterContacts = (contacts, filter) =>
  contacts.filter(
    ({ name, lastname, email, telephone }) =>
      -1 < name.toLowerCase().indexOf(filter) ||
      -1 < lastname.toLowerCase().indexOf(filter) ||
      -1 < email.toLowerCase().indexOf(filter) ||
      -1 < telephone.toLowerCase().indexOf(filter),
  );

const Main = () => {
  const [ allContacts, setAllContacts ] = useState([]);
  const [ contact, setContact ] = useState(null);
  const [ contacts, setContacts ] = useState([]);
  const [ filter, setFilter ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ loadingSave, setLoadingSave ] = useState(true);
  const [ mounted, setMounted ] = useState(false);
  const [ showModal, setShowModal ] = useState(false);
  const [ showToast, setShowToast ] = useState(false);
  const [ toastText, setToastText ] = useState(false);

  const setCurrentContacts = () => {
    let newContacts = allContacts && allContacts.length ? [ ...allContacts ] : [];

    if (filter) {
      newContacts = filterContacts(allContacts, filter.toLowerCase());
    }

    setContacts(newContacts);
  };

  const reload = () => {
    setLoading(true);
    getAllContacts().then(({ data }) => {
      setAllContacts(data);
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
      .catch((error) => {
        newToast(
          error?.response?.data?.message ?
            'Email duplicated' :
            `Error ${newContact._id ? 'updating' : 'creating'} contact`,
        );
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
        newToast('Error while removing contact');
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
    setCurrentContacts(contacts);
  }, [ allContacts, filter ]);

  useEffect(() => {
    if (showToast) {
      setTimeout(() => setShowToast(false), 5000);
    }
    setLoadingSave(false);
  }, [ showToast ]);

  return (
    <main>
      <Navbar onAdd={() => setContact({})} onFilter={setFilter} />
      <div id="main-container">
        <List contacts={contacts} loading={loading} onDelete={onDelete} onEdit={setContact} />
        {showModal && <Modal contact={contact} loading={loadingSave} onHide={() => setContact(null)} onSave={onSave} />}
        <Toast show={showToast} text={toastText} />
      </div>
    </main>
  );
};

export default Main;
