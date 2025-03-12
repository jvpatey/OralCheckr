import { useQuery } from "@tanstack/react-query";
import {
  fetchHabitLogs,
  handleHabitLogServiceError,
} from "../../services/habitLogService";

/* -- Hook for fetching logs for a specific habit -- */
export const useFetchHabitLogs = (
  habitId: number,
  year?: number,
  month?: string
) => {
  return useQuery({
    queryKey: ["habitLogs", habitId, year, month],
    queryFn: () => fetchHabitLogs(habitId, year, month),
    enabled: !!habitId,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

/* -- Error handler for habit logs fetch errors -- */
export const useHabitLogsFetchErrorMessage = (error: unknown): string => {
  if (!error) return "";
  return handleHabitLogServiceError(error);
};
