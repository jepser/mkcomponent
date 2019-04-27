import React from 'react';
import { mount } from 'enzyme';

import $ComponentName from '.';

describe('$ComponentName', () => {
  it('should render', () => {
    const wrapper = mount(<$ComponentName />);
    expect(wrapper.exists()).toBe(true);
  });
});
