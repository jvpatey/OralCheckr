import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteAllHabits,
  handleHabitServiceError,
} from "../../services/habitService";

/* -- Hook for deleting all habits -- */
export const useDeleteAllHabits = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAllHabits,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      queryClient.invalidateQueries({ queryKey: ["habitLogs"] });
    },
  });
};

/* -- Error handler for delete all habits errors -- */
export const useDeleteAllHabitsErrorMessage = (error: unknown): string => {
  if (!error) return "";
  return handleHabitServiceError(error);
};
