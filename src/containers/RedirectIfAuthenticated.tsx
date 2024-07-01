import { Navigate } from "react-router-dom";
import { RoutePaths } from "../common/Routes";

export function RedirectIfAuthenticated({
  children,
}: {
  children: JSX.Element;
}) {
  const isAuthenticated = localStorage.getItem("authenticated") === "true";

  if (isAuthenticated) {
    return <Navigate to={RoutePaths.DASHBOARD} replace={true} />;
  }

  return children;
}
