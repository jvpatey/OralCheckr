import React, { createContext, useEffect, useState } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  loading: boolean;
  user?: { userId: number | "guest"; role?: string };
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  loading: true,
});

export const AuthProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthContextProps>({
    isAuthenticated: false,
    loading: true,
  });

  useEffect(() => {
    // Replace with your actual endpoint to validate the token
    fetch("/api/auth/validate", { credentials: "include" })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setAuthState({
            isAuthenticated: true,
            loading: false,
            user: data.user,
          });
        } else {
          setAuthState({ isAuthenticated: false, loading: false });
        }
      })
      .catch(() => {
        setAuthState({ isAuthenticated: false, loading: false });
      });
  }, []);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};
