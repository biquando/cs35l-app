import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function withAuth(Component) {
  return (props) => {
    const history = useHistory();
    const { token, authAttempted } = useAuth();
    useEffect(() => {
      if (!token && authAttempted) history.push("/");
    }, [token, authAttempted]);
    return <Component {...props} />;
  };
}
