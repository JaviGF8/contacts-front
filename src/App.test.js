import React from 'react';
import { mount, shallow } from 'enzyme';

import App from './App';

describe('Contacts challenge', () => {
  it('App render correctly', () => {
    const component = shallow(<App />);

    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('render navbar', () => {
    const wrapper = mount(<App />);

    const navbar = wrapper.find('.navbar');
    expect(navbar).toHaveLength(1);

    wrapper.unmount();
  });

  it('render title', () => {
    const wrapper = mount(<App />);

    const title = wrapper.find('h1');
    expect(title).toHaveLength(1);
    expect(title.text()).toEqual('My contacts');

    wrapper.unmount();
  });

  it('render contacts list', () => {
    const wrapper = mount(<App />);

    const contacts = wrapper.find('.contacts-list');
    expect(contacts).toHaveLength(1);

    wrapper.unmount();
  });

  it('render custom toast', () => {
    const wrapper = mount(<App />);

    const toast = wrapper.find('.custom-toast');
    expect(toast).toHaveLength(1);

    wrapper.unmount();
  });
});
