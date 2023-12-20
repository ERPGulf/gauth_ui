import React from 'react';
import './Other.style.css';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();

  const handleChangePassword =() =>{
    navigate('/Changepassword');
    
  }

  const handleDeleteUser = () => {
    navigate('/DeleteAccount');
  }

  const handleDisableAccount = () => {
    navigate('/DisableAccount')
  }
  return (
    <div className='maintanancebox'>

      <div 
      style=
      {{
        
        marginTop:'100px',
        color: 'white',
        fontStyle: 'inherit',
      }}
      >
      <p><button onClick={handleChangePassword} style={{ fontSize:'20px',color:'black', background:'white',width:'800px',height:'50px',paddingRight:'500px'}}>Change Password </button></p>
      <p><button onClick={handleDeleteUser} style={{fontSize:'20px', color:'black', background:'white',width:'800px',height:'50px',paddingRight:'500px'}}>Delete Account</button></p>
      <p><button onClick={handleDisableAccount} style={{fontSize:'20px',color:'black', background:'white',width:'800px',height:'50px',paddingRight:'500px'}}>Disable Account</button></p>
      </div>
    </div>
  )
}

export default Settings