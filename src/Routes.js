import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './containers/Login';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login}/>
    <Route path="/login" component={Login}/>
  </Switch>
);

export default Routes;
