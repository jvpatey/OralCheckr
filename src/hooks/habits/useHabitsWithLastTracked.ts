import { useQuery } from "@tanstack/react-query";
import { fetchHabits, Habit } from "../../services/habitService";
import { format } from "date-fns";

export interface HabitWithLastTracked {
  habitId: number;
  name: string;
  lastTracked: string | null;
}

// Custom hook to fetch habits with their last tracked dates
export function useHabitsWithLastTracked() {
  const {
    data: habits,
    isLoading,
    isError,
    error,
  } = useQuery<Habit[], Error>({
    queryKey: ["habits"],
    queryFn: fetchHabits,
    retry: false,
  });

  // Check if no habits data exists
  const hasNoData = !isLoading && !isError && (!habits || habits.length === 0);

  // Format the habits data with last tracked information
  const formattedData: HabitWithLastTracked[] =
    habits?.map((habit) => ({
      habitId: habit.habitId || 0,
      name: habit.name,
      lastTracked: habit.updatedAt
        ? format(new Date(habit.updatedAt), "MMMM d, yyyy")
        : null,
    })) || [];

  return {
    data: formattedData,
    isLoading,
    isError: isError && !hasNoData,
    error: hasNoData ? null : error,
    hasNoData,
  };
}
