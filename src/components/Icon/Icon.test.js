import React from 'react';
import { shallow } from 'enzyme';

import Icon from './Icon';

describe('Icon component', () => {
  it('Icon render correctly', () => {
    const wrapper = shallow(<Icon />);

    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });

  it('Test icon', () => {
    const wrapper = shallow(<Icon icon="test-icon" />);

    const icon = wrapper.find('.test-icon');
    expect(icon).toHaveLength(1);

    wrapper.unmount();
  });
});
