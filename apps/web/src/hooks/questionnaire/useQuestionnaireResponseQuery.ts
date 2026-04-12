import { useQuery } from "@tanstack/react-query";
import {
  getQuestionnaireResponse,
  QuestionnaireResponse,
} from "../../services/quesService";

/** Single source for GET /questionnaire/response (shared cache with useHasSavedResponse). */
export function useQuestionnaireResponseQuery() {
  return useQuery<QuestionnaireResponse | null, Error>({
    queryKey: ["questionnaireResponse"],
    queryFn: getQuestionnaireResponse,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 2,
    initialData: null,
  });
}
