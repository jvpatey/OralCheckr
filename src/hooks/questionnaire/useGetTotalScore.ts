import { useQuery } from "@tanstack/react-query";
import { getTotalScore } from "../../services/quesService";

export const useGetTotalScore = (
  hasCompletedQuestionnaire: boolean = false
) => {
  return useQuery<number>({
    queryKey: ["totalScore"],
    queryFn: getTotalScore,
    enabled: hasCompletedQuestionnaire,
    retry: false,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
