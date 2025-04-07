import { useQuery } from "@tanstack/react-query";
import { validateAuth, AuthResponse } from "../../services/authService";

// Check if there's likely a session based on cookie existence
const hasSessionCookie = () => {
  return (
    document.cookie.includes("session") ||
    document.cookie.includes("connect.sid") ||
    document.cookie.includes("auth") ||
    document.cookie.includes("jwt")
  );
};

export const useValidateAuth = () => {
  // Only run auth validation if there's a session
  const shouldFetch = hasSessionCookie();

  return useQuery<AuthResponse | null, Error>({
    queryKey: ["auth"],
    queryFn: validateAuth,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 0, // Don't cache auth state
    retry: false,
    // Don't attempt validation if there's no session cookie
    enabled: shouldFetch,
  });
};
