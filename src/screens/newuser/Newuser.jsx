import React, { useState, useContext } from 'react';
import { generateToken, createUser } from '../../ApiManage/ApiHelper';
import { useNavigate } from 'react-router-dom';
import './Newuser.style.css';
import UserContext from '../../Contexts/User/UserContext';

const Newuser = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [reset_key, setResetkey] = useState('');
  const navigate = useNavigate(); // Pass an empty object to useNavigate

  const { userData } = useContext(UserContext);
  const { email, phone } = userData;

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsFormSubmit(true);
    console.log('Email:', email);
  console.log('Phone:', phone);
  console.log('Username:', name);

    try {
      const newAccount = await createUser(name, email, phone, password);
      console.log(newAccount);

      if (newAccount.reset_key) {
        console.log('Reset Key:', newAccount.reset_key);
        // Optionally, you can set the reset_key in the component state
        setResetkey(newAccount.reset_key);
      }
      
    } catch (error) {
      console.error('Error in creating new account:', error);
      alert('Error in creating new account');
    }
  };

  return (
    <div className='newuser'>
      <img
        className='loginimage'
        src='https://www.freeiconspng.com/thumbs/podcast-icon/podcast-icon-19.jpg'
        alt='Signup'
      />
      <form onSubmit={handleSignup}>
        <label htmlFor='username'></label>
        <input
          className='username'
          type='text'
          id='username'
          name='username'
          value={name}
          required
          placeholder='Full name'
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor='password'></label>
        <input
          className='Password'
          type='password'
          id='password'
          name='Password'
          value={password}
          required
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <p></p>
        <button className='continue' type='submit'>
          Signup
        </button>
      </form>
      {/* Display reset_key if available */}
      {reset_key && (
        <div>
          <p style={{color: 'black'}}>Reset Key: {reset_key}</p>
          {/* You can add additional UI or actions related to the reset_key here */}
        </div>
      )}
    </div>
  );
};

export default Newuser;
