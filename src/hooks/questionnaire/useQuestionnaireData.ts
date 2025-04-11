import { useQuery } from "@tanstack/react-query";
import {
  getQuestionnaireResponse,
  QuestionnaireResponse,
} from "../../services/quesService";
import { format } from "date-fns";
import { useHasSavedResponse } from "./useHasSavedResponse";

// Structure for formatted questionnaire data
export interface QuestionnaireData {
  lastCompleted: string | null;
  score: number | null;
}

// Hook for fetching and formatting questionnaire data
export function useQuestionnaireData() {
  // Check if user has any saved responses
  const { data: hasSavedData } = useHasSavedResponse();

  // Fetch raw questionnaire data
  const { data, isLoading, isError, error } = useQuery<
    QuestionnaireResponse | null,
    Error
  >({
    queryKey: ["questionnaireResponse"],
    queryFn: getQuestionnaireResponse,
    // Try to fetch if we're not sure about saved data
    enabled: hasSavedData !== false,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 2,
    initialData: null,
  });

  // Format the raw questionnaire data for display
  const formattedData: QuestionnaireData = {
    lastCompleted:
      data && data.updatedAt
        ? format(new Date(data.updatedAt), "MMMM d, yyyy")
        : null,
    score: data?.totalScore ?? null,
  };

  return {
    data: formattedData,
    isLoading,
    isError,
    error,
    hasNoData: !data,
  };
}
