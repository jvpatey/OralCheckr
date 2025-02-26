import { useMutation } from "@tanstack/react-query";
import {
  saveQuestionnaireResponse,
  SaveResponseData,
} from "../../services/quesService";

export const useSaveQuestionnaireResponse = () => {
  return useMutation<void, Error, SaveResponseData>({
    mutationFn: saveQuestionnaireResponse,
  });
};
