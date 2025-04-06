import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchHabitLogs,
  handleHabitLogServiceError,
  HabitLogResponse,
} from "../../services/habitLogService";
import { addMonths, format } from "date-fns";

/* -- Hook for fetching logs for a specific habit -- */
export const useFetchHabitLogs = (
  habitId: number,
  year?: number,
  month?: string
) => {
  const queryClient = useQueryClient();

  // Prefetch adjacent months' data
  const prefetchAdjacentMonths = () => {
    if (!year || !month || !habitId) return;

    const currentDate = new Date(year, new Date(`${month} 1`).getMonth());

    // Prefetch next month
    const nextMonth = addMonths(currentDate, 1);
    const nextMonthStr = format(nextMonth, "MMMM").toLowerCase();
    const nextYear = nextMonth.getFullYear();

    queryClient.prefetchQuery({
      queryKey: ["habitLogs", habitId, nextYear, nextMonthStr],
      queryFn: () => fetchHabitLogs(habitId, nextYear, nextMonthStr),
      staleTime: 30 * 60 * 1000, // 30 minutes
    });

    // Prefetch previous month
    const prevMonth = addMonths(currentDate, -1);
    const prevMonthStr = format(prevMonth, "MMMM").toLowerCase();
    const prevYear = prevMonth.getFullYear();

    queryClient.prefetchQuery({
      queryKey: ["habitLogs", habitId, prevYear, prevMonthStr],
      queryFn: () => fetchHabitLogs(habitId, prevYear, prevMonthStr),
      staleTime: 30 * 60 * 1000, // 30 minutes
    });
  };

  // Main query
  const query = useQuery<HabitLogResponse>({
    queryKey: ["habitLogs", habitId, year, month],
    queryFn: () => fetchHabitLogs(habitId, year, month),
    enabled: !!habitId,
    staleTime: 30 * 60 * 1000, // 30 minutes
    retry: 1,
  });

  // Trigger prefetch when data is available
  if (query.data) {
    prefetchAdjacentMonths();
  }

  return query;
};

/* -- Error handler for habit logs fetch errors -- */
export const useHabitLogsFetchErrorMessage = (error: unknown): string => {
  if (!error) return "";
  return handleHabitLogServiceError(error);
};
