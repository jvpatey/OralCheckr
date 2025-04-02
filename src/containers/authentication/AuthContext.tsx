import React, { createContext, useState } from "react";
import { useValidateAuth } from "../../hooks/auth/useValidateAuth";

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
  const [localUser, setLocalUser] = useState<User | null>(null);

  const updateAuth = (user: User | null) => {
    // Update local state immediately
    setLocalUser(user);
    // Then refetch to ensure server state is in sync
    refetch();
  };

  const authState = {
    isAuthenticated: !!data || !!localUser,
    loading: isLoading,
    authUser: localUser || data?.user,
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
