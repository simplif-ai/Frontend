import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/login/Login';
import RequestPasswordReset from './pages/login/RequestPasswordReset';
import PasswordReset from './pages/login/PasswordReset';
import Profile from './pages/profile/Profile';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login}/>
    <Route path="/login" component={Login}/>
    <Route path="/request-password-reset" component={RequestPasswordReset}/>
    <Route path="/password-reset" component={PasswordReset}/>
    <Route path="/login" component={Login}/>
    <Route path="/profile" component={Profile}/>
  </Switch>
);

export default Routes;
