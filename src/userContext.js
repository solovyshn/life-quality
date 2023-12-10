import { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userID, setUserID] = useState(null);
  const [userType, setUserType] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userFullName, setUserFullName] = useState(null);

  const setUser = (id, type, email, fullName) => {
    setUserID(id);
    setUserType(type);
    setUserEmail(email);
    setUserFullName(fullName);
  };

  return (
    <UserContext.Provider value={{ userID, userType, userEmail, userFullName, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
