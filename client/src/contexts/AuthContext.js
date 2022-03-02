import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signUp, verifyToken } from "../utils/auth";

const AuthContext = React.createContext({
  token: null,
  authAttempted: false,
  handleLogIn: () => {},
  handleSignUp: () => {},
  errorMessage: () => {},
  loading: false,
});

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
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
      const { token } = await verifyToken();
      setToken(token);
    } catch (error) {
      console.error(error);
      navigate("/login");
      setErrorMessage(error.message);
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
      console.error(error);
      setErrorMessage(error.message);
      navigate("/login");
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
