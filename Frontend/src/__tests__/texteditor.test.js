import React from 'react';
import ReactDOM from 'react-dom';
import Summary from '../pages/summary/index';
import {mount} from 'enzyme';

test('text area is editable', ()=> {
    const summary = "To science we owe dramatic changes in our smug self-image. Astronomy taught us that our earth isn't the center of the universe but merely one of billions of heavenly bodies. From biology we learned that we weren't specially created by God but evolved along with millions of other species. Now archaeology is demolishing another sacred belief: that human history over the past million years has been a long tale of progress. In particular, recent discoveries suggest that the adoption of agriculture, supposedly our most decisive step toward a better life, was in many ways a catastrophe from which we have never recovered. With agriculture came the gross social and sexual inequality, the disease and despotism, that curse our existence. At first, the evidence against this revisionist interpretation will strike twentieth century Americans as irrefutable. We're better off in almost every respect than people of the Middle Ages, who in turn had it easier than cavemen, who do";

    const wrapper = mount(
        <Summary />
    );
    const p = wrapper.find('#summary');
    expect(p).to.have.length(1);
});
