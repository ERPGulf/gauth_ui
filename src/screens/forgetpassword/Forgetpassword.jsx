import React, { useState } from 'react';
import { generateToken, generateResetPasswordKey, checkPasswordStrength, updatePassword } from '../../ApiManage/ApiHelper';


const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetKey, setResetKey] = useState('');
  const [isResetKeyGenerated, setIsResetKeyGenerated] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false); // Added state for update success

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      generateToken();
      // Call generateResetPasswordKey
      const resetKeyResponse = await generateResetPasswordKey(email);
      console.log('Reset Key Response:', resetKeyResponse);

      // Check if the reset key is present in the response
      if (resetKeyResponse && resetKeyResponse.data && resetKeyResponse.data.reset_key) {
        const generatedResetKey = resetKeyResponse.data.reset_key;
        console.log('Reset Key:', generatedResetKey);

        // Update state with the generated reset key
        setResetKey(generatedResetKey);
        setIsResetKeyGenerated(true);
      } else {
        console.error('Invalid reset key response:', resetKeyResponse);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
  
    try {
      // Now, call checkPasswordStrength with the reset key and input password
      const strengthResponse = await checkPasswordStrength(newPassword);
      console.log('Validation:', strengthResponse.data.message.feedback.password_policy_validation_passed);
  
      // Check if password validation passed
      if (strengthResponse && strengthResponse.data && strengthResponse.data.message.feedback.password_policy_validation_passed) {
        // Call updatePassword function
        const updatePasswordResponse = await updatePassword(newPassword, resetKey);
        console.log('Update Password Response:', updatePasswordResponse);
  
        // Check if the update was successful
        if (updatePasswordResponse && updatePasswordResponse.data) {
          setUpdateSuccess(true);
        } else {
          setUpdateSuccess(false);
        }
      } else {
        // Set validation error if password strength is not sufficient
        setValidationError('Password strength does not meet requirements. Please choose another password.');
      }
    } catch (error) {
      console.error('Error during password update:', error);
    }
  };
  

  return (
    <div className="container">
      <img
        className='loginimage'
        src='https://www.freeiconspng.com/thumbs/podcast-icon/podcast-icon-19.jpg'
        alt='Login'
      />
      {!isResetKeyGenerated ? (
        <form onSubmit={handleClick}>
          <input
            className='email'
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <p></p>
          <button className='continue' type="submit">Continue</button>
        </form>
      ) : (
        <form onSubmit={handlePasswordReset}>
          <input
            className='email'
            type="text"
            placeholder="Enter reset key"
            value={resetKey}
            readOnly
          />
          <input
            className='email'
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
          <p></p>
          <button className='continue' type="submit">Reset Password</button>
          {validationError && <p>{validationError}</p>}
          {updateSuccess && 
          <p 
          style={{
            color:'black',
            marginLeft:'38px',
            marginTop:'50px',
            fontSize:'23px',
          }}
            >
              Password updated successfully!
            </p>}
        </form>
      )}
    </div>
  );
};

export default ForgetPassword;
