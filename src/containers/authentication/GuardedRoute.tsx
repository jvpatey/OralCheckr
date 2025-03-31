import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";

export function GuardedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingSpinner fullHeight />;
  }

  return isAuthenticated ? children : <Navigate to="/" />;
}
