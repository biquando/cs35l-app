import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signUp, verifyToken } from "../utils/auth";

const AuthContext = React.createContext({
  token: null,
  authAttempted: false,
  handleLogIn: () => {},
  handleSignUp: () => {},
});

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [authAttempted, setAuthAttempted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(true);
  const history = useNavigate();

  useEffect(() => {
    initializeAuth();
  }, []);

  async function initializeAuth() {
    try {
      const { token } = await verifyToken();
      setToken(token);
    } catch (error) {
      console.error(error);
      history.push("/login");
      setErrorMessage(error.message);
    }
    setAuthAttempted(true);
  }

  async function handleSignUp({ username, password }) {
    try {
      const { token } = await signUp({ username, password });
      setToken(token);
      history.push("/");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
      history.push("/login");
    }
    setAuthAttempted(true);
  }

  async function handleLogIn({ username, password }) {
    try {
      const { token } = await login({ username, password });
      setToken(token);
      history.push("/");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
      history.push("/login");
    }
    setAuthAttempted(true);
  }

  return (
    <AuthContext.Provider
      value={{ token, authAttempted, errorMessage, handleSignUp, handleLogIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
