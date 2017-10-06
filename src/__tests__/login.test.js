import React from 'react';
import Login from '../src/pages/login/Login';
import {mount} from 'enzyme';

test('Invalid login error message', ()=> {
    const response = {error: 'Invalid Login'};
    const wrapper = mount(
        <Login error={response.error}/>
    );
    const p = wrapper.find('errorClass');
    expect(p.text()).toBe('Invalid Login');
});
