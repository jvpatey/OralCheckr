import { useQuery } from "@tanstack/react-query";
import { getQuestionnaireProgress } from "../../services/quesService";

// Structure for questionnaire progress data
interface QuestionnaireProgress {
  responses: Record<number, number | number[]>;
  currentQuestion: number;
}

// Hook for fetching and managing questionnaire progress
export const useGetQuestionnaireProgress = (shouldFetch: boolean = true) => {
  return useQuery<QuestionnaireProgress | null>({
    queryKey: ["questionnaireProgress"],
    queryFn: getQuestionnaireProgress,
    enabled: shouldFetch,
    retry: 1,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};
