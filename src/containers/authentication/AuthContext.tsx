import React, { createContext } from "react";
import { useValidateAuth } from "../../hooks/useValidateAuth";

interface User {
  userId: number;
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
  const { data, isLoading, refetch } = useValidateAuth();

  const updateAuth = (_user: User | null) => {
    // After login or logout refetch to update auth state.
    refetch();
  };

  const authState = {
    isAuthenticated: !!data,
    loading: isLoading,
    authUser: data?.user,
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        loading: authState.loading,
        user: authState.authUser,
        updateAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
