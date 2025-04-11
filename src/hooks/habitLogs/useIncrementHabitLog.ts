import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  incrementHabitLog,
  handleHabitLogServiceError,
  HabitLogResponse,
} from "../../services/habitLogService";

// Hook for incrementing habit log counts
export const useIncrementHabitLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // Increment log count for a specific habit and date
    mutationFn: ({ habitId, date }: { habitId: number; date: Date }) =>
      incrementHabitLog(habitId, date),
    // Refresh related queries after successful increment
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

// Hook for handling increment error messages
export const useIncrementHabitLogErrorMessage = (error: unknown): string => {
  if (!error) return "";
  return handleHabitLogServiceError(error);
};
