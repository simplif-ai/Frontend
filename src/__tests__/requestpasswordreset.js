import React from 'react';
import RequestPasswordReset from '../pages/login/RequestPasswordReset';
import Adapter from 'enzyme-adapter-react-16';
import {mount} from 'enzyme';
import Enzyme from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

test('PW reset requires email', ()=> {
    const wrapper = mount(
        <RequestPasswordReset/>
    );
    wrapper.find('email');
});
