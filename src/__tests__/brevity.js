import React from 'react';
import { Cookies } from 'react-cookie';
import Summary from '../pages/summary/index';
import {mount} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

test('brevity slider exists', ()=> {
   /* let cookie={"isAuthenticated":true};
    cookie.get=function(key){
        return cookie[key];
    }
    const wrapper = mount(
    <Summary cookies={cookie}/>
    );
    wrapper.find('brevity fixed fixed-slider');
    */
});
test("summary can create div", ()=> {
    const div = document.createElement('div');
  });