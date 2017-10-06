import React from 'react';
import '../../css/login.css';

const LoginForm = ({ login , error }) => (
  <form onSubmit={login}>
    <div className = "errorClass">
      {error ? `Error= ${error}` : null} awef
    </div>
    <label htmlFor="email">email </label>
    <input type="email" name="email" required />
    <label htmlFor="password">password </label>
    <input type="password" name="password" required />
    <input type="submit" name="submit" value="submit" style={{"color":"#1A334F"}} />
    <a href="/request-password-reset">Forgot your password?</a>
  </form>
);

export default LoginForm;
