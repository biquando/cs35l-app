import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStoredAuthToken, login, signUp, verifyToken } from "../utils/auth";

const AuthContext = React.createContext({
  token: null,
  authAttempted: false,
  handleLogIn: () => {},
  handleSignUp: () => {},
  errorMessage: () => {},
  loading: false,
  user: null,
});

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [authAttempted, setAuthAttempted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    initializeAuth();
  }, []);

  async function initializeAuth() {
    setLoading(true);
    try {
      const { token, user } = await verifyToken();
      setToken(token);
      setUser(user);
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
    setAuthAttempted(true);
    setLoading(false);
  }

  async function handleSignUp({ username, password }) {
    setLoading(true);
    try {
      const { token } = await signUp({ username, password });
      setToken(token);
      navigate("/");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      navigate("/signup");
    }
    setAuthAttempted(true);
    setLoading(false);
  }

  async function handleLogIn({ username, password }) {
    setLoading(true);
    try {
      const { token } = await login({ username, password });
      setToken(token);
      navigate("/");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
      navigate("/login");
    }
    setAuthAttempted(true);
    setLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        loading,
        authAttempted,
        errorMessage,
        handleSignUp,
        handleLogIn,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}