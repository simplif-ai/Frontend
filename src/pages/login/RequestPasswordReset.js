import React from 'react';

const PasswordReset = ({ login }) => (
  <form onSubmit={login}>
    <label placeholder="email" type="" htmlFor="email">
      Enter your email address to reset your password.
    </label>
    <input type="email" name="email" required />
    <input type="submit" value="Submit" />
    <a href='/login'>Already have an account? Sign In</a>
  </form>
);

export default PasswordReset;
