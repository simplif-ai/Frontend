import React from 'react';
import '../../css/login.css';
import '../../css/register.css';

const LoginForm = ({ login , error }) => (
  <form onSubmit={login}>
    <div className = "errorClass">
      {error ? {error} : null}
    </div>
    <label htmlFor="email">email </label>
    <input type="email" name="email" required />
    <label htmlFor="password">password </label>
    <input type="password" name="password" required />
    <br/>
    <input className="btn" type="submit" name="submit" value="submit" />
    <a href="/request-password-reset">Forgot your password?</a>
    <br/>
    <a href="/register">Create an Account</a>
  </form>
);

export default LoginForm;
