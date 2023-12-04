import { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userID, setUserID] = useState(null);
  const [userType, setUserType] = useState(null);

  const setUser = (id, type) => {
    setUserID(id);
    setUserType(type);
  };

  return (
    <UserContext.Provider value={{ userID, userType, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
