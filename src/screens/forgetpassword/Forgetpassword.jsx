import React, { useState } from 'react';
import { generateToken, generateResetPasswordKey } from '../../ApiManage/ApiHelper';

const Forgetpassword = () => {

  const handleClick = async () => {
    try {
      // Call generateToken
      generateToken()

      // Call generateResetPasswordKey
      const response = await generateResetPasswordKey();
      console.log('Reset Password Key Response:', response);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h1 style={{ color: 'black' }}>hi</h1>
      <button onClick={handleClick}>Generate Token and Reset Key</button>
      <p>Reset Key: {resetKey}</p>
    </div>
  );
};

export default Forgetpassword;
