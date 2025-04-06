import { useQuery } from "@tanstack/react-query";
import { hasSavedResponse } from "../../services/quesService";

export const useHasSavedResponse = (
  hasCompletedQuestionnaire: boolean = false
) => {
  return useQuery({
    queryKey: ["hasSavedResponse"],
    queryFn: hasSavedResponse,
    enabled: hasCompletedQuestionnaire,
    retry: false,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
