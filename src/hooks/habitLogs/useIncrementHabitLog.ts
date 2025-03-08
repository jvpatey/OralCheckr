import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  incrementHabitLog,
  handleHabitLogServiceError,
} from "../../services/habitLogService";

/* -- Hook for incrementing a habit log count -- */
export const useIncrementHabitLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ habitId, date }: { habitId: number; date: Date }) =>
      incrementHabitLog(habitId, date),
    onSuccess: (_, variables) => {
      // Invalidate the specific habit logs query
      queryClient.invalidateQueries({
        queryKey: ["habitLogs", variables.habitId],
      });
    },
  });
};

/* -- Error handler for habit log increment errors -- */
export const useIncrementHabitLogErrorMessage = (error: unknown): string => {
  if (!error) return "";
  return handleHabitLogServiceError(error);
};
