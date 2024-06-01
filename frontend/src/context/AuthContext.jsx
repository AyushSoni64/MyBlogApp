import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [authMessage, setAuthMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedToken && savedUser) {
      setIsAuthenticated(true);
      setToken(savedToken);
      setUser(savedUser);
    }
  }, [isAuthenticated]);

  const login = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/blogs");
    setIsAuthenticated(true);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/blogs");
  };

  const value = {
    user,
    token,
    authMessage,
    setAuthMessage,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

let globalLogout = () => {};

export const setGlobalLogout = (logoutFunction) => {
  globalLogout = logoutFunction;
};

export const getGlobalLogout = () => {
  return globalLogout;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
