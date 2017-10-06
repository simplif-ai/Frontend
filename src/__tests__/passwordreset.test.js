import React from 'react';
import PasswordReset from '../pages/login/PasswordReset';
import {mount} from 'enzyme';

test('Unable to reset password error message', ()=> {
    const response = {error: 'Invalid Password Reset'};
    const wrapper = mount(
        <PasswordReset error={response.error}/>
    );
    const p = wrapper.find('errorClass');
    expect(p.text()).toBe('Invalid Password Reset');
});
