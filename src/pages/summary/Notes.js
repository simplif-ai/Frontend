import React from 'react';
import { Switch, Route } from 'react-router';
import ListNotes from './ListNotes';
import Summary from './index';

const Notes = () => (
  <Switch>
    <Route exact path='/notes' component={ListNotes}/>
    <Route path='/notes/:noteId' component={Summary}/>
  </Switch>
)

export default Notes;
