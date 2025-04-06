import { useQuery } from "@tanstack/react-query";
import { getTotalScore } from "../../services/quesService";

export const useGetTotalScore = (
  hasCompletedQuestionnaire: boolean = false
) => {
  return useQuery({
    queryKey: ["totalScore"],
    queryFn: async () => {
      const result = await getTotalScore();
      return result ?? null;
    },
    enabled: hasCompletedQuestionnaire,
    retry: false,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};
