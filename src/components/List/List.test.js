import React from 'react';
import { shallow } from 'enzyme';

import List from './List';

const defaultFn = () => true;
const contacts = [
  {
    _id: '1',
    name: 'name1',
    lastname: 'lastname1',
    email: 'email1',
    telephone: 'telephone1',
  },
  {
    _id: '2',
    name: 'name2',
    lastname: 'lastname2',
    email: 'email2',
    telephone: 'telephone2',
  },
];

describe('List component', () => {
  it('List render correctly', () => {
    const wrapper = shallow(<List onDelete={defaultFn} onEdit={defaultFn} />);

    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });

  it('Test header', () => {
    const wrapper = shallow(<List onDelete={defaultFn} onEdit={defaultFn} contacts={contacts} />);

    const header = wrapper.find('.contact.contact-header');
    expect(header).toHaveLength(1);

    wrapper.unmount();
  });

  it('Test contacts', () => {
    const wrapper = shallow(<List onDelete={defaultFn} onEdit={defaultFn} contacts={contacts} />);

    const contact = wrapper.find('.contact.fadein');
    expect(contact).toHaveLength(2);

    wrapper.unmount();
  });

  it('Test loading', () => {
    const wrapper = shallow(<List onDelete={defaultFn} onEdit={defaultFn} loading />);

    const loading = wrapper.find('.loading');
    expect(loading).toHaveLength(1);

    wrapper.unmount();
  });
});
