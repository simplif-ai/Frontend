import React from 'react';
import Summary from '../pages/summary/index';
import {mount} from 'enzyme';

test('Unable to change brevity', ()=> {
    const response = {error: 'Unable to change brevity'};
    const wrapper = mount(
        <Summary error={response.error}/>
    );
    const p = wrapper.find('errorClass');
    expect(p.text()).toBe('Unable to change brevity');
});
