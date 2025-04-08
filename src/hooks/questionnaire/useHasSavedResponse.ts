import { useQuery } from "@tanstack/react-query";
import { hasSavedResponse } from "../../services/quesService";

export const useHasSavedResponse = () => {
  return useQuery({
    queryKey: ["hasSavedResponse"],
    queryFn: hasSavedResponse,
    // Always try to fetch
    staleTime: 0, // Always consider the data stale
    gcTime: 0, // Don't keep in cache
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 2, // Retry failed requests
    initialData: false,
  });
};
