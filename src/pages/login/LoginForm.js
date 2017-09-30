import React from 'react';

const LoginForm = ({ login }) => (
  <form onSubmit={login}>
    <label htmlFor="email">email </label>
    <input type="email" name="email" required />
    <label htmlFor="password">password </label>
    <input type="password" name="password" required />
    <input type="submit" name="submit" value="submit" style={{"color":"#1A334F"}} />
  </form>
);

export default LoginForm;
