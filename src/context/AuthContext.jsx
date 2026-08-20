import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = () => {
    authAPI.logout();
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    setIsLoading(false);
  };

  // Restore session on application startup
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          const response = await authAPI.getProfile();
          if (response && response.data) {
            setUser(response.data);
            setToken(storedToken);
            setIsAuthenticated(true);
          } else {
            handleLogout();
          }
        } catch {
          handleLogout();
        }
      } else {
        setIsLoading(false);
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await authAPI.login({ email, password });
      if (response && response.data) {
        const loggedInUser = response.data;
        const jwtToken = response.data.token;
        setUser(loggedInUser);
        setToken(jwtToken);
        setIsAuthenticated(true);
        setIsLoading(false);
        return loggedInUser;
      }
      throw new Error("Invalid response format from login API");
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const refreshUser = async () => {
    try {
      const response = await authAPI.getProfile();
      if (response && response.data) {
        setUser(response.data);
      }
    } catch (error) {
      // Keep existing user state if refresh fails temporarily
    }
  };

  const value = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login: handleLogin,
    logout: handleLogout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
