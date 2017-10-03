import React from 'react';

const PasswordReset = ({ login }) => (
  <form onSubmit={login}>
    <label placeholder="password" type="" htmlFor="password" />
    <input type="password" name="password" required />
    <label placeholder="confirm password" type="" htmlFor="password" />
    <input type="password" name="password" required />
    <input type="submit" value="Submit" />
  </form>
);

export default PasswordReset;
