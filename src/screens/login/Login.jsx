import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/Loggedin')

    // You can handle the form submission logic here, e.g., send a request to the server
    console.log('Form submitted:', { identifier, password });
  };

  const handleForgetClick = () => {
    // Trigger navigation to the login page
    navigate('/Forgotpassword');
  };
  const handleSignupClick = () => {
    // Trigger navigation to the Signup page
    navigate('/Signup');
  };

  return (
    <div className='container'>
      <img
        className='loginimage'
        src='https://www.freeiconspng.com/thumbs/podcast-icon/podcast-icon-19.jpg'
        alt='Login'
      />
      <h3 className='create'>Login Your Account</h3>
      <p style={{marginLeft:'15%',color:'black'}}>Login for HashiCorp to continue</p>
      <form onSubmit={handleSubmit}>
        {/* Email or Phone Input */}
        <label htmlFor='identifier'></label>
        <input
          className='email'
          type='text'
          id='identifier'
          name='identifier'
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
          placeholder='Email or Phone number'
        />
        {/* Password Input */}
        <label htmlFor='password'></label>
        <input
          className='email'
          type='password'
          id='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder='Password'
        />
        {/* Login Button */}
        <p></p>
        <button className='continue' type='submit'>
          Login
        </button>
      </form>
      <p>
        
        <span style={{ color: 'blue', cursor:'pointer', marginLeft:'15%'}} onClick={handleForgetClick}>
          Forgot Password?
        </span>
        <span style={{ color: 'blue', cursor:'pointer', marginLeft:'15%'}} onClick={handleSignupClick}>
          New user?
        </span>
      </p>
    </div>
  );
};

export default Login;
