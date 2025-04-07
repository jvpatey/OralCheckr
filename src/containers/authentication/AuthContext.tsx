import React, { createContext, useState, useEffect, useCallback } from "react";
import { useValidateAuth } from "../../hooks/auth/useValidateAuth";

interface User {
  userId: number;
  role?: string;
  firstName?: string;
  lastName?: string;
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
  const [validationInProgress, setValidationInProgress] = useState(false);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  // Always check authentication on first mount for non-welcome pages
  useEffect(() => {
    if (!initialCheckDone) {
      const isWelcomePage = window.location.hash === "#/";
      if (!isWelcomePage) {
        setValidationInProgress(true);
        refetch().finally(() => {
          setValidationInProgress(false);
          setInitialCheckDone(true);
        });
      } else {
        setInitialCheckDone(true);
      }
    }
  }, [initialCheckDone, refetch]);

  // Synchronize server auth state with local state
  useEffect(() => {
    if (!isLoading && !isFetching && data !== undefined) {
      if (data?.user) {
        // Update local state from server data
        setLocalUser(data.user);
      } else if (data === null) {
        // Server explicitly returned null or undefined
        setLocalUser(null);
      }
    }
  }, [data, isLoading, isFetching]);

  // Update auth - immediately sets local state and also validates with server
  const updateAuth = useCallback(
    (user: User | null) => {
      // Update local state immediately for responsive UI
      setLocalUser(user);

      // If user is provided (login/signup case), force validation with server
      if (user && !validationInProgress) {
        setValidationInProgress(true);
        refetch().finally(() => {
          setValidationInProgress(false);
        });
      }
    },
    [refetch, validationInProgress]
  );

  // Explicit check auth - returns a promise for components that need to wait for the check
  const checkAuth = useCallback(async (): Promise<void> => {
    if (validationInProgress) return;

    setValidationInProgress(true);
    try {
      await refetch();
    } finally {
      setValidationInProgress(false);
    }
  }, [refetch, validationInProgress]);

  const isWelcomePage = window.location.hash === "#/";

  return (
    <AuthContext.Provider
      value={{
        // Consider authenticated if we have a local user
        isAuthenticated: !!localUser,
        // Only show loading if actively fetching and no local user
        loading: (isLoading || isFetching) && !localUser && !isWelcomePage,
        // Use local user for immediate UI updates
        user: localUser || undefined,
        updateAuth,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
