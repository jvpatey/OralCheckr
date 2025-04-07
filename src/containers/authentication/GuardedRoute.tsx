import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";

export function GuardedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, loading, checkAuth } = useContext(AuthContext);
  const [hasChecked, setHasChecked] = useState(false);

  // Check authentication once when component mounts
  useEffect(() => {
    if (!isAuthenticated && !hasChecked) {
      checkAuth().finally(() => {
        setHasChecked(true);
      });
    } else {
      setHasChecked(true);
    }
  }, []);

  if (loading) {
    return <LoadingSpinner fullHeight />;
  }

  return isAuthenticated ? children : <Navigate to="/" />;
}
