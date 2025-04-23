import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Update localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Enhanced setUser that also handles logout
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    // Clear any other auth-related items from localStorage
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);