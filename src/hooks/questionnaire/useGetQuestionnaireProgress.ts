import { useQuery } from "@tanstack/react-query";
import { getQuestionnaireProgress } from "../../services/quesService";

interface QuestionnaireProgress {
  responses: Record<number, number | number[]>;
  currentQuestion: number;
}

export const useGetQuestionnaireProgress = (shouldFetch: boolean = true) => {
  return useQuery<QuestionnaireProgress | null>({
    queryKey: ["questionnaireProgress"],
    queryFn: getQuestionnaireProgress,
    enabled: shouldFetch,
    retry: 1, // Retry once on failure
    staleTime: 0, // Consider data always stale to ensure fresh data
    refetchOnMount: true, // Always refetch when component mounts
    refetchOnWindowFocus: true, // Refetch when window gets focus
    refetchOnReconnect: true, // Refetch when reconnecting
  });
};
