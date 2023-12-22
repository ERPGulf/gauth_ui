import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { getTime, tokenGenerated, whoIami } from '../../ApiManage/ApiHelper';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [time, setTime] = useState('');
  const [who, setWho] = useState('');

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
  const handleGetuser = () => {
    // Trigger navigation to the Signup page
    navigate('/Getuser');
  };

  const handleEnableuser = () => {
    // Trigger navigation to the Signup page
    navigate('/EnableAccount');
  };

  const handleLogin =() => {
    tokenGenerated();
    
  }
  
  const handleTime = async (e) => {
    e.preventDefault();
    try{
      const getServerTime = await getTime();
      setTime(getServerTime.data.message.data.serverTime);
      console.log(getServerTime.data.message.data);
    }catch (error) {
      
        console.error('Error ', error);
    } 
  };
  const handleWho = async (e) => {
    e.preventDefault();
    tokenGenerated();
    try{
      const getWho = await whoIami();
      setWho(getWho.data.message);
      console.log(getWho);
    }catch (error) {
      
        console.error('Error ', error);
    } 
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
        <button className='continue' type='submit' onClick={handleLogin}>
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
        <span style={{ color: 'blue', cursor:'pointer', marginLeft:'15%'}} onClick={handleGetuser}>
          Forgot username?
        </span>
        <span style={{ color: 'blue', cursor:'pointer', marginLeft:'15%'}} onClick={handleEnableuser}>
          Enable Account?
        </span>
        <span style={{ color: 'blue', cursor:'pointer', marginLeft:'15%'}} onClick={handleWho}>
          Check who loggedin
        </span>
        <span style={{ color: 'blue', cursor:'pointer', marginLeft:'12%'}} onClick={handleTime}>
          Get Time
        </span>
        {time &&(<p style={{color:'black',marginLeft:'58%',marginTop:'2%',fontSize:'12px'}}>{time}</p>)}
        
      </p>
        {who && (<p style={{color:'black',fontSize:'20px',marginLeft:'10%',marginRight:'10%',marginTop:'7%',borderStyle: 'solid',borderColor: 'grey',borderWidth: '1px',backgroundColor:'white',paddingLeft:'20px'}}>User is {who}</p>)}

    </div>
  );
};

export default Login;
