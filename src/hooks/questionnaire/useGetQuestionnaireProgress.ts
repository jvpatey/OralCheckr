import { useQuery } from "@tanstack/react-query";
import { getQuestionnaireProgress } from "../../services/quesService";

interface QuestionnaireProgress {
  responses: Record<number, number | number[]>;
  currentQuestion: number;
}

export const useGetQuestionnaireProgress = (shouldFetch: boolean = false) => {
  return useQuery<QuestionnaireProgress | null>({
    queryKey: ["questionnaireProgress"],
    queryFn: getQuestionnaireProgress,
    enabled: shouldFetch,
    retry: false, // Don't retry on failure
    staleTime: 30 * 60 * 1000, // Cache for 30 minutes
  });
};
