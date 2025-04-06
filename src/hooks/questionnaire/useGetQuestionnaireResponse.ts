import { useQuery } from "@tanstack/react-query";
import {
  getQuestionnaireResponse,
  QuestionnaireResponse,
} from "../../services/quesService";

export const useGetQuestionnaireResponse = (
  hasCompletedQuestionnaire: boolean = false
) => {
  return useQuery<QuestionnaireResponse | null, Error>({
    queryKey: ["questionnaireResponse"],
    queryFn: getQuestionnaireResponse,
    enabled: hasCompletedQuestionnaire,
    retry: false,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
