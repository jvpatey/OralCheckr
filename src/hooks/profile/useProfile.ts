import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/profileService";
import { useContext } from "react";
import { AuthContext } from "../../containers/authentication/AuthContext";

export function useProfile() {
  const {
    user,
    isAuthenticated,
    loading: authLoading,
  } = useContext(AuthContext);

  const isGuest = user?.role === "guest" || (isAuthenticated && !user?.role);
  const isWelcomePage = window.location.hash === "#/";

  // custom queryFn that immediately returns null for guest users
  const profileQueryFn = async () => {
    // Don't attempt API call on welcome page or for guest users
    if (isGuest || isWelcomePage || !isAuthenticated) {
      return null;
    }

    // Otherwise, proceed with the normal API call
    return await getProfile();
  };

  const {
    data: profile,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: profileQueryFn,
    // Don't retry on 401/403 errors
    retry: (failureCount, error) => {
      return (
        !error.message?.includes("401") &&
        !error.message?.includes("403") &&
        failureCount < 3
      );
    },
    // Only enable fetching when authenticated and not on welcome page
    enabled: isAuthenticated && !isWelcomePage && !authLoading,
    staleTime: 300000, // 5 minutes
    gcTime: 3600000, // 1 hour
    refetchOnWindowFocus: false,
  });

  return { profile, loading, error, refetch, isGuest };
}
