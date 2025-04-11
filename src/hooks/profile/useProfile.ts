import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/profileService";
import { useContext } from "react";
import { AuthContext } from "../../containers/authentication/AuthContext";

// Hook for managing user profile data
export function useProfile() {
  const {
    user,
    isAuthenticated,
    loading: authLoading,
  } = useContext(AuthContext);

  // Check if user is a guest
  const isGuest =
    user?.role === "guest" ||
    (user?.firstName === "Guest" && user?.lastName === "User");
  const isWelcomePage = window.location.hash === "#/";

  // Custom query function that handles guest users and welcome page
  const profileQueryFn = async () => {
    // Skip API call for guests or on welcome page
    if (isGuest || isWelcomePage || !isAuthenticated) {
      return null;
    }

    // Fetch profile data for authenticated users
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
    // Retry logic for non-auth errors
    retry: (failureCount, error) => {
      return (
        !error.message?.includes("401") &&
        !error.message?.includes("403") &&
        failureCount < 3
      );
    },
    // Only fetch when conditions are met
    enabled: isAuthenticated && !isWelcomePage && !authLoading && !isGuest,
    staleTime: 300000, // 5 minutes
    gcTime: 3600000, // 1 hour
    refetchOnWindowFocus: false,
  });

  return { profile, loading, error, refetch, isGuest };
}
