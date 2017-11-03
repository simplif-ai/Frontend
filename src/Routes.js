import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/login/Login';
import RequestPasswordReset from './pages/login/RequestPasswordReset';
import PasswordReset from './pages/login/PasswordReset';
import Register from './pages/login/Register';
import ProfileParent from './pages/profile/ProfileParent';
import Summary from './pages/summary/index';
import Notes from './pages/summary/Notes';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login}/>
    <Route path="/login" component={Login}/>
    <Route path="/request-password-reset" component={RequestPasswordReset}/>
    <Route path="/password-reset" component={PasswordReset}/>
    <Route path="/register" component={Register}/>
    <Route path="/profile" component={ProfileParent}/>
    <Route path="/summary" component={Summary}/>
    <Route path="/notes" component={Notes}/>
  </Switch>
);

export default Routes;
