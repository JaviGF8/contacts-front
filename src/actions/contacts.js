import { get, post, put, remove } from './ApiWrapper';

const CONTACT_URL = 'contact';

export const getAllContacts = () => get(CONTACT_URL);

export const createContact = (contact) => post(CONTACT_URL, { contact });

export const deleteContact = (_id) => remove(`${CONTACT_URL}/${_id}`);

export const updateContact = (contact) => put(`${CONTACT_URL}/${contact._id}`, contact);
