import React, { createContext, useEffect, useState } from "react";
import { validateAuth, AuthResponse } from "../../services/authService";

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
    (async () => {
      const data: AuthResponse | null = await validateAuth();
      if (data) {
        setAuthState({
          isAuthenticated: true,
          loading: false,
          user: data.user,
        });
      } else {
        setAuthState({ isAuthenticated: false, loading: false });
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};
