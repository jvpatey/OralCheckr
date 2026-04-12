import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  saveQuestionnaireProgress,
  type QuestionnaireResponse,
} from "../../services/quesService";

// Structure for questionnaire progress data
interface ProgressData {
  responses: Record<number, number | number[]>;
  currentQuestion: number;
  [key: string]: unknown;
}

// Hook for saving questionnaire progress
export const useSaveQuestionnaireProgress = () => {
  const queryClient = useQueryClient();

  // Mutation for saving questionnaire progress
  return useMutation<void, Error, ProgressData>({
    mutationFn: async (progressData) => {
      await saveQuestionnaireProgress(progressData);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["questionnaireProgress"] });
      queryClient.setQueryData(
        ["questionnaireResponse"],
        (prev: QuestionnaireResponse | null | undefined) => {
          if (!prev) {
            void queryClient.invalidateQueries({
              queryKey: ["questionnaireResponse"],
            });
            return prev;
          }
          return {
            ...prev,
            responses: variables.responses as QuestionnaireResponse["responses"],
            currentQuestion: variables.currentQuestion,
          };
        }
      );
    },
  });
};
