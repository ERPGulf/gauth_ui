import React, { useState,useEffect } from 'react';
import './App.css';
import Sidebar from './components/ui/sidebar/Sidebar';




function App() {
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

    </div>
  );
}

export default App;

