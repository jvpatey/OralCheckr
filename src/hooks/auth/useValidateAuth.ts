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
    refetchOnMount: false, // Don't refetch on mount - we'll control this manually
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: false, // Don't retry on failure
    enabled: false, // Start disabled and manually trigger
  });
};
