import React, { createContext, useState, useEffect, useCallback } from "react";
import { useValidateAuth } from "../../hooks/auth/useValidateAuth";
import { useQueryClient } from "@tanstack/react-query";

// User data structure
interface User {
  userId: number;
  role?: string;
  firstName?: string;
  lastName?: string;
}

// Auth context interface - manages user authentication state
interface AuthContextProps {
  isAuthenticated: boolean;
  loading: boolean;
  user?: User;
  updateAuth: (user: User | null) => void;
  checkAuth: () => Promise<void>;
}

// Create auth context with default values
export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  loading: false,
  updateAuth: () => {},
  checkAuth: async () => {},
});

// Provider component to manage auth state across the app
export const AuthProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { data, isLoading, refetch, isFetching } = useValidateAuth();
  const [localUser, setLocalUser] = useState<User | null>(null);
  const [validationInProgress, setValidationInProgress] = useState(false);
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const queryClient = useQueryClient();

  // Check auth on first mount for non-welcome pages
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

  // Sync server auth state with local state
  useEffect(() => {
    if (!isLoading && !isFetching && data !== undefined) {
      if (data?.user) {
        setLocalUser(data.user);
      } else if (data === null) {
        setLocalUser(null);
      }
    }
  }, [data, isLoading, isFetching]);

  // Update auth state and validate with server
  const updateAuth = useCallback(
    (user: User | null) => {
      setLocalUser(user);

      // Clear cache on logout
      if (user === null) {
        queryClient.setQueryData(["hasSavedResponse"], false);
        queryClient.setQueryData(["totalScore"], null);
        queryClient.setQueryData(["questionnaireResponse"], null);
        queryClient.setQueryData(["questionnaireProgress"], null);
        queryClient.clear();
      }

      // Validate with server on login/signup
      if (user && !validationInProgress) {
        setValidationInProgress(true);
        refetch().finally(() => {
          setValidationInProgress(false);
        });
      }
    },
    [refetch, validationInProgress, queryClient]
  );

  // Force auth check when needed
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
        isAuthenticated: !!localUser,
        loading: (isLoading || isFetching) && !localUser && !isWelcomePage,
        user: localUser || undefined,
        updateAuth,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
