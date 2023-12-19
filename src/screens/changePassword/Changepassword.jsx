import React, { useState } from 'react'
import { NewPassword } from '../../ApiManage/ApiHelper';

export const Changepassword = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState();

    const handleChangePassword = async (e) => {
        e.preventDefault();
       try{
        const updateNewPassword = await NewPassword(email, password);
        setMessage(updateNewPassword.data.message);
        console.log('password Changed',updateNewPassword.data.message);
       }  catch (error) {
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
