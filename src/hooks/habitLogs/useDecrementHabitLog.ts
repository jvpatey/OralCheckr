import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  decrementHabitLog,
  handleHabitLogServiceError,
} from "../../services/habitLogService";

/* -- Hook for decrementing a habit log count -- */
export const useDecrementHabitLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ habitId, date }: { habitId: number; date: Date }) =>
      decrementHabitLog(habitId, date),
    onSuccess: (_, variables) => {
      // Invalidate the specific habit logs query
      queryClient.invalidateQueries({
        queryKey: ["habitLogs", variables.habitId],
      });
    },
  });
};

/* -- Error handler for habit log decrement errors -- */
export const useDecrementHabitLogErrorMessage = (error: unknown): string => {
  if (!error) return "";
  return handleHabitLogServiceError(error);
};
