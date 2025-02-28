// src/hooks/questionnaire/useGetQuestionnaireProgress.ts
import { useQuery } from "@tanstack/react-query";
import { getQuestionnaireProgress } from "../../services/quesService";

interface QuestionnaireProgress {
  responses: Record<number, number | number[]>;
  currentQuestion: number;
}

export const useGetQuestionnaireProgress = () => {
  return useQuery<QuestionnaireProgress | null>({
    queryKey: ["questionnaireProgress"],
    queryFn: getQuestionnaireProgress,
  });
};
