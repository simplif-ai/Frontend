import React from 'react';
import Register from '../pages/login/Register';
import {mount} from 'enzyme';

test('Invalid registration error message', ()=> {
    const response = {error: 'Invalid Registration'};
    const wrapper = mount(
        <Register error={response.error}/>
    );
    const p = wrapper.find('errorClass');
    expect(p.text()).toBe('Invalid Registration');
});
