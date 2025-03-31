import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/profileService";

export function useProfile() {
  const {
    data: profile,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    // Don't retry on 401 errors
    retry: (failureCount, error) => {
      return !error.message?.includes("401") && failureCount < 3;
    },
  });

  return { profile, loading, error, refetch };
}
