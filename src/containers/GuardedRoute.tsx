import { Navigate } from "react-router-dom";

export function GuardedRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = localStorage.getItem("authenticated") === "true";

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/" />;
}
