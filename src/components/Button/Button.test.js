import React from 'react';
import jest from 'jest-mock';
import { shallow } from 'enzyme';

import Button from './Button';

describe('Button component', () => {
  it('Button render correctly', () => {
    const wrapper = shallow(<Button />);

    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });

  it('Test click event', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Button onClick={onClick} />);

    wrapper.find('button').simulate('click');
    expect(onClick).toHaveBeenCalled();

    wrapper.unmount();
  });

  it('Test text', () => {
    const wrapper = shallow(<Button text="test" />);

    const button = wrapper.find('.custom-btn');
    expect(button.text()).toEqual('test');

    wrapper.unmount();
  });

  it('Test disabled false', () => {
    const wrapper = shallow(<Button />);

    const button = wrapper.find('.custom-btn');
    expect(button.props().disabled).toEqual(false);

    wrapper.unmount();
  });

  it('Test disabled true', () => {
    const wrapper = shallow(<Button disabled />);

    const button = wrapper.find('.custom-btn');
    expect(button.props().disabled).toEqual(true);

    wrapper.unmount();
  });
});
