import React from 'react';
import Login from '../pages/login/Login';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });
import {mount} from 'enzyme';

test('Login page allows for login', ()=> {
    /*const response = {error: 'Invalid Login'};
    */
    const wrapper = mount(
        <Login/>
    );
    const p = wrapper.find('registerbox');
});
test('Login page displays logo', ()=> {
    const wrapper = mount(
        <Login/>
    );
    const p = wrapper.find('logo');
});
