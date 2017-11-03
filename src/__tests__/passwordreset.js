import React from 'react';
import PasswordReset from '../pages/login/PasswordReset';
import Adapter from 'enzyme-adapter-react-16';
import {mount} from 'enzyme';
import Enzyme from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

test('able to set password', ()=> {
    /*const response = {error: 'Invalid Password Reset'};*/
    const wrapper = mount(
        <PasswordReset/>
    );
    wrapper.find('password');
    /*const p = wrapper.find('errorClass');
    expect(p.text()).toBe('Invalid Password Reset');*/
});
