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

    const titleElement = wrapper.find('.navbar');
    expect(titleElement).toHaveLength(1);

    wrapper.unmount();
  });

  it('render title', () => {
    const wrapper = mount(<App />);

    const titleElement = wrapper.find('h1');
    expect(titleElement).toHaveLength(1);
    expect(titleElement.text()).toEqual('My contacts');

    wrapper.unmount();
  });

  it('render contacts list', () => {
    const wrapper = mount(<App />);

    const titleElement = wrapper.find('.contacts-list');
    expect(titleElement).toHaveLength(1);

    wrapper.unmount();
  });

  it('render custom toast', () => {
    const wrapper = mount(<App />);

    const titleElement = wrapper.find('.custom-toast');
    expect(titleElement).toHaveLength(1);

    wrapper.unmount();
  });
});
