import React from 'react';
import EditSummary from '../pages/summary/EditSummary';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import {mount} from 'enzyme';
import Enzyme from 'enzyme';
import { Cookies } from 'react-cookie';
Enzyme.configure({ adapter: new Adapter() });


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditSummary />, div);
});
