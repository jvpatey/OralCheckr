import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateHabit,
  Habit,
  handleHabitServiceError,
} from "../../services/habitService";

/* -- Hook for updating an existing habit -- */
export const useUpdateHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      habitId,
      habit,
    }: {
      habitId: number;
      habit: Pick<Habit, "name" | "count">;
    }) => updateHabit(habitId, habit),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });
};

/* -- Error handler for habit update errors -- */
export const useHabitUpdateErrorMessage = (error: unknown): string => {
  if (!error) return "";
  return handleHabitServiceError(error);
};
