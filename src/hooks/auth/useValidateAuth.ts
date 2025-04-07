import { useQuery } from "@tanstack/react-query";
import { validateAuth, AuthResponse } from "../../services/authService";

/**
 * Custom hook to validate authentication status
 */
export const useValidateAuth = () => {
  return useQuery<AuthResponse | null, Error>({
    queryKey: ["auth"],
    queryFn: validateAuth,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    retry: 0, // Don't retry failed requests
    refetchOnReconnect: false, // Don't refetch on reconnect
    enabled: false, // Don't fetch automatically
  });
};
