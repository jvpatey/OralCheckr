import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveQuestionnaireProgress } from "../../services/quesService";

interface ProgressData {
  responses: Record<number, number | number[]>;
  currentQuestion: number;
  [key: string]: unknown;
}

export const useSaveQuestionnaireProgress = () => {
  const queryClient = useQueryClient();

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
