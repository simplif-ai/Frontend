import React from 'react';
import SummarizeUrl from '../pages/summary/SummarizeUrl';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import {mount} from 'enzyme';
import Enzyme from 'enzyme';
import { Cookies } from 'react-cookie';
Enzyme.configure({ adapter: new Adapter() });


describe('Test SummarizeUrl Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SummarizeUrl />, div);
  });

  it('renders without crashing', () => {
    const wrapper = mount(<SummarizeUrl />);
    let input = wrapper.find('#input-url').simulate('change', {target: {value: 'text'}});

    expect(wrapper.find('#input-url').exists());
    wrapper.find('form').simulate('submit');
  });
});
