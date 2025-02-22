import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { RoutePaths } from "../../common/constants/routes";

export function RedirectIfAuthenticated({
  children,
}: {
  children: JSX.Element;
}) {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Navigate to={RoutePaths.LANDING} /> : children;
}
