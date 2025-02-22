import React, { createContext, useEffect, useState } from "react";
import { validateAuth } from "../../services/authService";

interface User {
  userId: number | "guest";
  role?: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  loading: boolean;
  user?: User;
  updateAuth: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  loading: true,
  updateAuth: () => {},
});

export const AuthProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean;
    loading: boolean;
    user?: User;
  }>({
    isAuthenticated: false,
    loading: true,
  });

  const updateAuth = (user: User | null) => {
    if (user) {
      setAuthState({ isAuthenticated: true, loading: false, user });
    } else {
      setAuthState({ isAuthenticated: false, loading: false });
    }
  };

  useEffect(() => {
    (async () => {
      const data = await validateAuth();
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
    <AuthContext.Provider value={{ ...authState, updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
