import React from 'react';
import Register from '../pages/login/Register';
import Adapter from 'enzyme-adapter-react-16';
import {mount} from 'enzyme';
import Enzyme from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

test('registration asks for name', ()=> {
    const wrapper = mount(
        <Register/>
    );
    const p = wrapper.find('fname');
});
test('registration asks for email', ()=> {

    const wrapper = mount(
        <Register/>
    );
    const p = wrapper.find('email');
});
test('registration asks for phone', ()=> {
    const wrapper = mount(
        <Register/>
    );
    const p = wrapper.find('phone');
});