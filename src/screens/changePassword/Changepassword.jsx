import React, { useState } from 'react'
import { NewPassword, checkPasswordStrength } from '../../ApiManage/ApiHelper';

export const Changepassword = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState();
    const [validationError, setValidationError] = useState('');

    const handleChangePassword = async (e) => {
        e.preventDefault();
       
        try {
          // Now, call checkPasswordStrength with the reset key and input password
          const strengthResponse = await checkPasswordStrength(password);
          console.log('Validation:', strengthResponse.data.message.feedback.password_policy_validation_passed);
      
          // Check if password validation passed
          if (strengthResponse && strengthResponse.data && strengthResponse.data.message.feedback.password_policy_validation_passed) {
            // Call updatePassword function
            const updateNewPassword = await NewPassword(email, password);
            setMessage(updateNewPassword.data.message);
            console.log('password Changed',updateNewPassword.data.message);
            // Check if the update was successful
          } else {
            // Set validation error if password strength is not sufficient
            setValidationError('Password strength does not meet requirements. Please choose another password.');
          }
        } catch (error) {
          console.error('Error changing password:', error);
        }
      };
  return (
    <div style={{
    borderStyle: 'solid',
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: '1px',
    width: '400px',
    height: '450px',
    
    borderRadius: '2%',
    marginLeft: '40%',
    }}>
        <h1 style={{color:'black',marginLeft:'50px',marginTop:'50px'}}>Change Password</h1>
        <form style={{marginTop:'80px'}} >
          <input
            className='email'
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <p></p>
          <input
            className='email'
            type="Password"
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <p></p>
          <button className='continue' type="submit" onClick={handleChangePassword}>Confirm</button>
        </form>
        <p style={{color:'black',marginLeft:'80px'}}>{message}</p>
    </div>
  )
}
