import React, { useState,useEffect } from 'react';
import './Loggedin.style.css';
import Sidebar from '../../components/ui/sidebar/Sidebar';
import Balance from '../../components/ui/balance/Balance';
import Accruedcharges from '../../components/ui/Accured/Accruedcharges';
import History from '../../components/ui/History/History'
import Maintanance from '../../components/other_ui/Maintanance';
import User from '../../components/other_ui/User';
import LoginHistory from '../../components/other_ui/LoginHistory';
import Service from '../../components/other_ui/Service';
import Settings from '../../components/other_ui/Settings';


function Loggedin() {
    const [selectedOpen, setOpen] = useState('billing');
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const handleOpenClick = (selectedMenu) => {
      
      setOpen(selectedMenu);
    };
  
    const handleSidebarToggle = () => {
      setSidebarOpen(!isSidebarOpen);
    };
  
    useEffect(() => {
      
      if (window.innerWidth <= 1050) {
        setSidebarOpen(false);
      }
      const handleResize = () => {
        setSidebarOpen(window.innerWidth > 1050);
      };
  
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []); 
  
    return ( 
      <div className={`app-container ${isSidebarOpen ? '' : 'closedd'}`}>
        
        <Sidebar onSidebarToggle={handleSidebarToggle} isSidebarOpen={isSidebarOpen}/>
        <div className='abc'>
        <span className='bbb' onClick={() => handleOpenClick('billing')}>Billing Info</span>
        <span className='bbb' onClick={() => handleOpenClick('user')}>Users & Grants</span>
        <span className='bbb' onClick={() => handleOpenClick('LoginHistory')}>Login History</span>
        <span className='bbb' onClick={() => handleOpenClick('Service')}>Service Transfers</span>
        <span className='bbb' onClick={() => handleOpenClick('maintenance')}> Maintenance</span>
        <span className='bbb' onClick={() => handleOpenClick('settings')}> Settings</span>
        <h1 className={`bottomlines ${isSidebarOpen ? '' : 'closedline'}`}></h1>
        </div>
        
  
        <div className='xyz'>
        {selectedOpen === 'billing' && (
          <>
            <Balance />
            <Accruedcharges />
            <History />
          </>
        )}
        {selectedOpen === 'maintenance' && <Maintanance />}
        {selectedOpen === 'user' && <User />}
        {selectedOpen === 'Login' && <Login />}
        {selectedOpen === 'Service' && <Service />}
        {selectedOpen === 'settings' && <Settings />}
        
        
        
        
        </div>
      </div>
    );
  }
export default Loggedin;