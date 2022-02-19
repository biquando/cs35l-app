import React, { useContext, useEffect, useState } from "react";
import { verifyToken } from "../utils/auth";

const initialState = {
  token: null,
  authAttempted: false,
};
const AuthContext = React.createContext(initialState);

export default function AuthContextProvider({ children }) {
  const [authState, setAuthState] = useState(initialState);

  useEffect(() => {
    verifyToken()
      .then(({ token }) => {
        setAuthState((prev) => ({ ...prev, token, authAttempted: true }));
      })
      .catch((error) => {
        console.error(error);
        setAuthState((prev) => ({ ...prev, authAttempted: true }));
      });
  }, []);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
