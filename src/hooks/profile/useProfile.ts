import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/profileService";
import { useContext } from "react";
import { AuthContext } from "../../containers/authentication/AuthContext";

export function useProfile() {
  const { user } = useContext(AuthContext);
  const isGuest = user?.role === "guest";

  const {
    data: profile,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    // Don't retry on 401/403 errors
    retry: (failureCount, error) => {
      return (
        !error.message?.includes("401") &&
        !error.message?.includes("403") &&
        failureCount < 3
      );
    },
    // Skip profile fetching for guest users
    enabled: !isGuest,
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: true,
  });

  return { profile, loading, error, refetch };
}
