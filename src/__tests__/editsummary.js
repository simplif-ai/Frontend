import React from 'react';
import EditSummary from '../pages/summary/EditSummary';
import Summary from '../pages/summary/index';
import Adapter from 'enzyme-adapter-react-16';
import {mount} from 'enzyme';
import Enzyme from 'enzyme';
import { Cookies } from 'react-cookie';
Enzyme.configure({ adapter: new Adapter() });

test('Invalid summary edit error message', ()=> {
    /*const { cookies } = new Cookies();
    cookies.isAuthenticated=false;
    const receivedSummary = false;
    const wrapper = mount(
        <Summary receivedSummary={this.receivedSummary} cookies={this.cookies}/>
    );
    expect(wrapper.error).toBe('You can only edit summarized text!'); */
});
test("editsummary can create div", ()=> {
    const div = document.createElement('div');
  });