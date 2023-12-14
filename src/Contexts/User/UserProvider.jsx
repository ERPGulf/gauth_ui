import React, { useState } from 'react';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    email: '',
    phone: '',
  });

  const updateUser = (email, phone) => {
    setUserData({
      email,
      phone,
    });
  };

  return (
    <UserContext.Provider value={{ userData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
