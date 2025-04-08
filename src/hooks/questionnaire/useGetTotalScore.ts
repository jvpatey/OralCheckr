import { useQuery } from "@tanstack/react-query";
import { getTotalScore } from "../../services/quesService";
import { useHasSavedResponse } from "./useHasSavedResponse";

export const useGetTotalScore = () => {
  const { data: hasSavedData } = useHasSavedResponse();

  return useQuery({
    queryKey: ["totalScore"],
    queryFn: getTotalScore,
    // Try to fetch if we're not sure about saved data
    enabled: hasSavedData !== false,
    staleTime: 0, // Always consider the data stale
    gcTime: 0, // Don't keep in cache
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 2, // Retry failed requests
    initialData: null,
  });
};
