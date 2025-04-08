import { useQuery } from "@tanstack/react-query";
import {
  getQuestionnaireResponse,
  QuestionnaireResponse,
} from "../../services/quesService";
import { format } from "date-fns";
import { useHasSavedResponse } from "./useHasSavedResponse";

export interface QuestionnaireData {
  lastCompleted: string | null; // Formatted date string or null if no completion
  score: number | null; // Total oral health score or null if not available
}

// Custom hook to fetch and format questionnaire data
export function useQuestionnaireData() {
  const { data: hasSavedData } = useHasSavedResponse();

  const { data, isLoading, isError, error } = useQuery<
    QuestionnaireResponse | null,
    Error
  >({
    queryKey: ["questionnaireResponse"],
    queryFn: getQuestionnaireResponse,
    // Try to fetch if we're not sure about saved data
    enabled: hasSavedData !== false,
    staleTime: 0, // Always consider the data stale
    gcTime: 0, // Don't keep in cache
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 2, // Retry failed requests
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
