import React, { useState } from 'react'
import { deleteUser_ } from '../../ApiManage/ApiHelper';

export const Deleteuser = () => {
    const [username, setUsername] =useState();
    const [email, setEmail] = useState();
    const [mobileno, setMobileno] = useState();
    const [message, setMessage] = useState();
    
    const handleDeleteuser = async (e) => {
        e.preventDefault();
        try{
            const deleteUserAccount = await deleteUser_(username, email, mobileno);
            setMessage(deleteUserAccount.data.message);
            console.log(deleteUserAccount.data.message);
        }catch (error) {
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
            <h1 style={{color:'black',marginLeft:'50px',marginTop:'50px'}}>Delete Account</h1>
            <form style={{marginTop:'80px'}} >
            <input
            className='email'
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <p></p>
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
            type="tel"
            placeholder="Enter your mobile number"
            value={mobileno}
            onChange={e => setMobileno(e.target.value)}
          />
          <p></p>
          <button className='continue' type="submit" onClick={handleDeleteuser}>Delete Account</button>
        </form>
        <p style={{color:'black',marginLeft:'80px'}}>{message}</p>
    </div>
       
  )
}
