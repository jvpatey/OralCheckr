import { useQuery } from "@tanstack/react-query";
import {
  getQuestionnaireResponse,
  QuestionnaireResponse,
} from "../../services/quesService";
import { format } from "date-fns";

export interface QuestionnaireData {
  lastCompleted: string | null; // Formatted date string or null if no completion
  score: number | null; // Total oral health score or null if not available
}

// Custom hook to fetch and format questionnaire data
export function useQuestionnaireData() {
  const { data, isLoading, isError, error } = useQuery<
    QuestionnaireResponse | null,
    Error
  >({
    queryKey: ["questionnaireResponse"],
    queryFn: getQuestionnaireResponse,
    retry: false,
  });

  // Data not found if we get a null value
  const hasNoData = data === null;

  // Format the raw questionnaire data for display
  const formattedData: QuestionnaireData = {
    // Format the completion date if available, otherwise null
    lastCompleted:
      data && data?.updatedAt
        ? format(new Date(data.updatedAt), "MMMM d, yyyy")
        : null,
    // Get the total score if available, otherwise null
    score: data?.totalScore ?? null,
  };

  return {
    data: formattedData,
    isLoading,
    isError: isError && !hasNoData,
    error: hasNoData ? null : error,
    hasNoData: hasNoData || (isError && error?.message?.includes("404")),
  };
}
