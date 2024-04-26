import { createContext, useState } from "react";

export const Context = createContext({
  isAuthenticated: false,
});

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(false);
  
  return (
    <Context.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      {children}
    </Context.Provider>
  );
};
