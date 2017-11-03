import React from 'react';
import { Switch, Route } from 'react-router';
import Profile from './Profile';
import GoogleAuth from './GoogleAuth';

const Notes = () => (
  <Switch>
    <Route exact path='/profile' component={Profile}/>
    <Route path='/profile/:token' component={GoogleAuth}/>
  </Switch>
)

export default Notes;
