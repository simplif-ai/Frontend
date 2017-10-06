import React from 'react';
import '../../css/register.css';
import headphones from '../../assets/background/white-headphones.svg';

const Register = ({ login, error }) => (
  <div className = "page bgorange">
    <img src={headphones} style = {{"position":"absolute","left":"10px", "opacity": ".05", "width":"100%", "height":"100%"}}/> 
    <h1> Register </h1>
    <div className = "registerbox">
      <form onSubmit={login}>
        <div className = "errorClass">
          {error ? `Error=${error}` : null}
        </div>
        <label placeholder="First Name" type="" htmlFor="email">first name</label>
        <input type="email" name="email" required />
        <label type="" htmlFor="email">email</label>
        <input type="email" name="email" required />
        <label type="" htmlFor="password">password</label>
        <input type="password" name="password" required />
        <input type="submit" value="submit" style={{"color":"1A334F", "width":"25%"}} />
        <a href='/login'>Already have an account? Sign In</a>
      </form>
    </div>
  </div>
);


export default Register;
