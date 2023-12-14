import React, { useState,useContext } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import { isUserAvailable, generateToken } from '../../ApiManage/ApiHelper';
import Newuser from '../newuser/Newuser';
import UserContext from '../../Contexts/User/UserContext';


export const Signup = () => {
  
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [existingAccountError, setExistingAccountError] = useState('');
  const navigate = useNavigate();
  const { userData, updateUser } = useContext(UserContext);
  const { email, phone } = userData;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mark the form as submitted
    setIsFormSubmitted(true);
    generateToken()
      .then(async (response) => {
        // Check if the user is available
        try {
          const userAvailability = await isUserAvailable(phone, email);
  
          // If the user is not available, set an error message and navigate to the login page
          if (!userAvailability.available) {
            setExistingAccountError('Account with this email or phone number already exists. Please login');
            return;
          }
        } catch (error) {
          console.error('Error checking user availability:', error);
          navigate('/Newuser');
          return;
        }
      })
      .catch((error) => {
        alert("Error");
      });
  };
  
    

  const handleLoginClick = () => {
    // Trigger navigation to the login page
    navigate('/');

  };
  const handleEmailChange = (e) => {
    const enteredEmail = e.target.value;
    // Use a regex pattern for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(enteredEmail));

    // Update the email state
    updateUser(enteredEmail);
    console.log('email',enteredEmail);
    
    setEmailErrorMessage(emailRegex.test(enteredEmail) ? '' : 'Please enter a valid email.');
    
  };

  const handlePhoneChange = (e) => {
    const enteredPhone = e.target.value;
    // Use a regex pattern to match 8 digits
    const phoneRegex = /^\d{10}$/;
    setIsValidPhone(phoneRegex.test(enteredPhone));

    // Update the phone state
    updateUser(enteredPhone);
    console.log('phone',enteredEmail);

    // Update the error message based on phone validation
    setPhoneErrorMessage(phoneRegex.test(enteredPhone) ? '' : 'Please enter a valid 8-digit phone number.');
  };

  
  return (
    
    <div className='containerr'>
      
      <img
        className='loginimage'
        src='https://www.freeiconspng.com/thumbs/podcast-icon/podcast-icon-19.jpg'
        alt='Signup'
      />
      <h3 className='create'>Create Your Account</h3>
      <p style={{ marginLeft: '15%', color: 'black' }}>Sign up for HashiCorp to continue</p>
      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <label htmlFor='email'></label>
        <input
          className='email'
          type='text'
          id='email'
          name='email'
          value={email}
          onChange={(e) => handleEmailChange(e)}
          required
          placeholder='Email address'
        />
        {/* Phone Input */}
        <input
          className='email'
          type='tel' // Set the type to "tel" for phone numbers
          id='phone'
          name='phone'
          value={phone}
          onChange={(e) => handlePhoneChange(e)}
          required
          placeholder='Phone number'
        />

        {/* Signup Button */}
        <p></p>
        <button className='continue' type='submit'>
          Continue
        </button>
      </form>
      {/* Log in Link */}
      <p style={{ color: 'black', marginLeft: '15%' }}>
        Already have an account?{' '}
        <span style={{ color: 'blue', cursor: 'pointer' }} onClick={handleLoginClick}>
          Log in
        </span>
      </p>

      {/* Display error message for phone number if form is submitted */}
      {isFormSubmitted && (
  <p style={{ color: 'red' }}>
    {!isValidPhone && !isValidEmail ? 'Please enter a valid email and phone number.' : ''}
    {!isValidPhone && isValidEmail && <span>{phoneErrorMessage}</span>}
    {isValidPhone && !isValidEmail && <span>{emailErrorMessage}</span>}
  </p>
)}

      {/* Display error message for existing account if form is submitted */}
      {isFormSubmitted && existingAccountError && (
        <p style={{ color: 'red' }}>{existingAccountError}</p>
      )}
       
    </div>
  );
};
