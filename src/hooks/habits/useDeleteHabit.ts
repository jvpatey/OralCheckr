import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteHabit,
  handleHabitServiceError,
} from "../../services/habitService";

/* -- Hook for deleting a habit -- */
export const useDeleteHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (habitId: number) => deleteHabit(habitId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      queryClient.invalidateQueries({ queryKey: ["habitLogs"] });
    },
  });
};

/* -- Error handler for habit deletion errors -- */
export const useHabitDeleteErrorMessage = (error: unknown): string => {
  if (!error) return "";
  return handleHabitServiceError(error);
};
