import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  saveQuestionnaireResponse,
  SaveResponseData,
} from "../../services/quesService";

export const useSaveQuestionnaireResponse = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, SaveResponseData>({
    mutationFn: saveQuestionnaireResponse,
    onSuccess: () => {
      // Invalidate all relevant queries to trigger refetch
      queryClient.invalidateQueries({ queryKey: ["hasSavedResponse"] });
      queryClient.invalidateQueries({ queryKey: ["totalScore"] });
      queryClient.invalidateQueries({ queryKey: ["questionnaireResponse"] });

      // Also set hasSavedResponse to true immediately
      queryClient.setQueryData(["hasSavedResponse"], true);
    },
  });
};
