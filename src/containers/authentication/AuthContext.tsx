import React, { createContext, useState, useEffect } from "react";
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
  checkAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  loading: false,
  updateAuth: () => {},
  checkAuth: async () => {},
});

export const AuthProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { data, isLoading, refetch, isFetching } = useValidateAuth();
  const [localUser, setLocalUser] = useState<User | null>(null);

  // Actively check auth state on initial mount for non-welcome pages
  useEffect(() => {
    const isWelcomePage = window.location.hash === "#/";
    if (!isWelcomePage) {
      refetch();
    }
  }, [refetch]);

  // Update local state when server auth data changes
  useEffect(() => {
    if (data?.user) {
      setLocalUser(data.user);
    } else if (data === null && !isLoading && !isFetching) {
      setLocalUser(null);
    }
  }, [data, isLoading, isFetching]);

  // Update auth state and trigger validation with the server
  const updateAuth = (user: User | null) => {
    setLocalUser(user);

    // Always refetch regardless of user state to ensure server state is updated
    refetch();
  };

  // Check auth state with server
  const checkAuth = async (): Promise<void> => {
    await refetch();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!localUser,
        loading: isLoading && !localUser,
        user: localUser || undefined,
        updateAuth,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
