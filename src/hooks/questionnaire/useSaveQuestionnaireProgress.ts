import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveQuestionnaireProgress } from "../../services/quesService";

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
    onSuccess: () => {
      // Invalidate the questionnaire progress query to ensure fresh data
      queryClient.invalidateQueries({ queryKey: ["questionnaireProgress"] });
    },
  });
};
