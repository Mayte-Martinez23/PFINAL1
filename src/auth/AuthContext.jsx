import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [doctor, setDoctor] = useState(() => {
    const stored = localStorage.getItem("doctor");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (token, doctorObj) => {
    localStorage.setItem("token", token);
    localStorage.setItem("doctor", JSON.stringify(doctorObj));
    setIsAuthenticated(true);
    setDoctor(doctorObj);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("doctor");
    setIsAuthenticated(false);
    setDoctor(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, doctor }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);