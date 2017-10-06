import React from 'react';
import '../../css/register.css'
import coffee from '../../assets/background/paper-coffee.svg';

const PasswordReset = ({ login, error }) => (
  <div className="page bgorange">
    <img src={coffee} style={{"width":"40%", "opacity":".1", "position":"absolute", "left":"10", "bottom":"20"}}/>
    <h1> Reset Password </h1>
    <div className="registerbox">
      <form onSubmit={login}>
        <div className = "errorClass">
          {error ? `Error=${error}` : null}
        </div>
        <label placeholder="password" type="" htmlFor="password">Password</label>
        <input type="password" name="password" required />
        <label placeholder="confirm password" type="" htmlFor="password">Confirm Password</label>
        <input type="password" name="password" required />
        <input type="submit" value="Submit" style={{"width":"25%"}} />
      </form>
    </div>
  </div>
);

export default PasswordReset;
