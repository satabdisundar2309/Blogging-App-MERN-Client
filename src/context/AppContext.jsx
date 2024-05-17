import React, { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [mode, setMode] = useState("dark");
  const values = {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    blogs,
    setBlogs,
    mode,
    setMode,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
