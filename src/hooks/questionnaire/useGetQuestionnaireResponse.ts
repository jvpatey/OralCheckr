import { useQuery } from "@tanstack/react-query";
import {
  getQuestionnaireResponse,
  QuestionnaireResponse,
} from "../../services/quesService";
import { useHasSavedResponse } from "./useHasSavedResponse";

export const useGetQuestionnaireResponse = () => {
  const { data: hasSavedData } = useHasSavedResponse();

  return useQuery<QuestionnaireResponse | null, Error>({
    queryKey: ["questionnaireResponse"],
    queryFn: getQuestionnaireResponse,
    enabled: hasSavedData === true,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    initialData: null,
  });
};
