import React, { useState } from 'react';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    email: '',
    phone: '',
  });

  const updateUser = (email, phone) => {
    setUserData((prevUserData) => ({
      email: email !== undefined ? email : prevUserData.email,
      phone: phone !== undefined ? phone : prevUserData.phone,
    }));
  };
  

  return (
    <UserContext.Provider value={{ userData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
