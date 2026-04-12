import { format } from "date-fns";
import { useQuestionnaireResponseQuery } from "./useQuestionnaireResponseQuery";

// Structure for formatted questionnaire data
export interface QuestionnaireData {
  lastCompleted: string | null;
  score: number | null;
}

// Hook for fetching and formatting questionnaire data
export function useQuestionnaireData() {
  const { data, isLoading, isError, error } = useQuestionnaireResponseQuery();

  const formatCompletedDate = (iso: string | undefined): string | null => {
    if (!iso) return null;
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return null;
    return format(d, "MMMM d, yyyy");
  };

  const formattedData: QuestionnaireData = {
    lastCompleted: data
      ? formatCompletedDate(data.completedAt ?? undefined) ??
        formatCompletedDate(data.updatedAt) ??
        formatCompletedDate(data.createdAt)
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
