import React from 'react';
import Login from '../pages/login/Login';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
import {mount} from 'enzyme';

test('Invalid login error message', ()=> {
    const response = {error: 'Invalid Login'};
    const wrapper = mount(
        <Login error={response.error}/>
    );
    const p = wrapper.find('errorClass');
    expect(p.text()).toBe('Invalid Login');
});
