import React, { useState } from 'react'
import { generateToken, getUsername } from '../../ApiManage/ApiHelper';

export const Getuser = () => {
    const [email, setEmail] = useState();
    const [mobileno, setMobileno] = useState();
    const [message, setMessage] = useState();

    const handleGetuser = async (e) => {
        e.preventDefault();
        generateToken();
        try{
            const userName = await getUsername(email, mobileno);
            setMessage(userName.data.message[0].name);
            console.log('Username',userName.data.message[0].name);
        }catch (error) {
            console.error('Error getting username:', error);
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
                <h1 style={{color:'black',marginLeft:'50px',marginTop:'50px'}}>Get Username</h1>
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
                type="tel"
                placeholder="Enter your mobile number"
                value={mobileno}
                onChange={e => setMobileno(e.target.value)}
              />
              <p></p>
              <button className='continue' type="submit" onClick={handleGetuser}>Get Username</button>
            </form>
            {message && (
        <p style={{ color: 'black', marginLeft: '60px' }}>Your Username is {message}</p>
      )}
        </div>
           
      )
    }
    