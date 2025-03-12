import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  decrementHabitLog,
  handleHabitLogServiceError,
  HabitLogResponse,
} from "../../services/habitLogService";

/* -- Hook for decrementing a habit log count -- */
export const useDecrementHabitLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ habitId, date }: { habitId: number; date: Date }) =>
      decrementHabitLog(habitId, date),
    onSuccess: (_data: HabitLogResponse, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["habitLogs", variables.habitId],
      });

      queryClient.invalidateQueries({
        queryKey: ["allHabitLogs"],
      });
    },
  });
};

/* -- Error handler for habit log decrement errors -- */
export const useDecrementHabitLogErrorMessage = (error: unknown): string => {
  if (!error) return "";
  return handleHabitLogServiceError(error);
};
