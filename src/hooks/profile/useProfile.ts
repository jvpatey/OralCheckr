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
  });

  return { profile, loading, error, refetch };
}
