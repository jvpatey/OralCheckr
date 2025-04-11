import { useQuery } from "@tanstack/react-query";
import { validateAuth, AuthResponse } from "../../services/authService";

// Hook for validating authentication status
export const useValidateAuth = () => {
  return useQuery<AuthResponse | null, Error>({
    queryKey: ["auth"],
    queryFn: validateAuth,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 0,
    refetchOnReconnect: false,
    enabled: false,
  });
};
