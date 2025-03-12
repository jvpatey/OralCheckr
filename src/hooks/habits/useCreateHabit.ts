import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createHabit,
  Habit,
  handleHabitServiceError,
} from "../../services/habitService";

/* -- Hook for creating a new habit -- */
export const useCreateHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      habit: Omit<Habit, "habitId" | "userId" | "createdAt" | "updatedAt">
    ) => createHabit(habit),
    onSuccess: () => {
      // Invalidate the habits query to refetch the list
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });
};

/* -- Error handler for habit creation errors -- */
export const useHabitCreateErrorMessage = (error: unknown): string => {
  if (!error) return "";
  return handleHabitServiceError(error);
};
