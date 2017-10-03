import React from 'react';

const LoginForm = ({ login }) => (
  <form onSubmit={login}>
    <label placeholder="email" type="" htmlFor="email" />
    <input type="email" name="email" required />
    <label placeholder="password" type="" htmlFor="password" />
    <input type="password" name="password" required />
    <input type="submit" value="Submit" />
    <a href="/request-password-reset">Forgot your password?</a>
  </form>
);

export default LoginForm;
