import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

export function GuardedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading... </div>;
  }

  return isAuthenticated ? children : <Navigate to="/" />;
}
