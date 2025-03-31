import { useQuery } from "@tanstack/react-query";
import {
  getQuestionnaireResponse,
  QuestionnaireResponse,
} from "../../services/quesService";

export const useGetQuestionnaireResponse = () => {
  return useQuery<QuestionnaireResponse, Error>({
    queryKey: ["questionnaireResponse"],
    queryFn: getQuestionnaireResponse,
    refetchOnWindowFocus: false,
  });
};
