import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  incrementHabitLog,
  handleHabitLogServiceError,
  HabitLogResponse,
} from "../../services/habitLogService";

/* -- Hook for incrementing a habit log count -- */
export const useIncrementHabitLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ habitId, date }: { habitId: number; date: Date }) =>
      incrementHabitLog(habitId, date),
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

/* -- Error handler for habit log increment errors -- */
export const useIncrementHabitLogErrorMessage = (error: unknown): string => {
  if (!error) return "";
  return handleHabitLogServiceError(error);
};
