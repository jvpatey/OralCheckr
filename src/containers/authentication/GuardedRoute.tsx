import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";

export function GuardedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, loading, checkAuth } = useContext(AuthContext);

  // Actively check authentication status when a protected route is accessed
  useEffect(() => {
    // Check auth state immediately
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <LoadingSpinner fullHeight />;
  }

  return isAuthenticated ? children : <Navigate to="/" />;
}
