import React from 'react';
import RequestPasswordReset from '../src/pages/login/RequestPasswordReset';
import {mount} from 'enzyme';

test('Unable to request password reset error message', ()=> {
    const response = {error: 'Invalid Password Reset Request'};
    const wrapper = mount(
        <RequestPasswordReset error={response.error}/>
    );
    const p = wrapper.find('errorClass');
    expect(p.text()).toBe('Invalid Password Reset Request');
});
