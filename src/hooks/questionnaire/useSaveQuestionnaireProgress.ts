import { useMutation } from "@tanstack/react-query";
import { saveQuestionnaireProgress } from "../../services/quesService";

interface ProgressData {
  responses: Record<number, number | number[]>;
  currentQuestion: number;
  [key: string]: unknown;
}

export const useSaveQuestionnaireProgress = () => {
  return useMutation<void, Error, ProgressData>({
    mutationFn: async (progressData) => {
      await saveQuestionnaireProgress(progressData);
    },
  });
};
