import React, { useState } from 'react';
import { generateToken, generateResetPasswordKey } from '../../ApiManage/ApiHelper';

const Forgetpassword = () => {
  const [email, setEmail] = useState('');

  const handleClick = async () => {
    try {
      // Call generateToken
      generateToken()

      // Call generateResetPasswordKey
      const response = await generateResetPasswordKey(email);
      console.log(email);
      console.log('Reset Password Key Response:', response);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      
      <input 
      style={{ color: 'black' }}
      type="text" 
      placeholder="Enter your email" 
      value={email} 
      onChange={e => setEmail(e.target.value)}
      />
      <button onClick={handleClick}>Generate Token and Reset Key</button>
      
      
    </div>
  );
};

export default Forgetpassword;
