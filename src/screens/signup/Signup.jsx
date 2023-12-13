import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark the form as submitted
    setIsFormSubmitted(true);

    // Check if both email and phone are valid before submitting
    if (isValidEmail && isValidPhone) {
      // Handle form submission logic here, e.g., send a request to the server
      console.log('Form submitted:', { email, phone });
    } else {
      console.log('Invalid email or phone number');
    }
  };

  const handleLoginClick = () => {
    // Trigger navigation to the login page
    navigate('/Login');
  };

  const handleEmailChange = (e) => {
    const enteredEmail = e.target.value;
    // Use a regex pattern for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(enteredEmail));

    // Update the email state
    setEmail(enteredEmail);
    setEmailErrorMessage(emailRegex.test(enteredEmail) ? '' : 'Please enter a valid email.');
  };

  const handlePhoneChange = (e) => {
    const enteredPhone = e.target.value;
    // Use a regex pattern to match 8 digits
    const phoneRegex = /^\d{8}$/;
    setIsValidPhone(phoneRegex.test(enteredPhone));

    // Update the phone state
    setPhone(enteredPhone);

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
      <p>Sign up for HashiCorp to continue</p>
      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <label htmlFor='email'></label>
        <input
          className='email'
          type='text'
          id='email'
          name='email'
          value={email}
          onChange={handleEmailChange}
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
          onChange={handlePhoneChange}
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
      <p>
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

    </div>
  );
};