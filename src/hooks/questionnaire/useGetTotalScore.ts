import { useQuery } from "@tanstack/react-query";
import { getTotalScore } from "../../services/quesService";
import { useHasSavedResponse } from "./useHasSavedResponse";

// Hook for fetching and managing questionnaire total score
export const useGetTotalScore = () => {
  // Check if user has any saved responses
  const { data: hasSavedData } = useHasSavedResponse();

  return useQuery({
    queryKey: ["totalScore"],
    queryFn: getTotalScore,
    // Try to fetch if we're not sure about saved data
    enabled: hasSavedData !== false,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 2,
    initialData: null,
  });
};
