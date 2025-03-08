import { useQuery } from "@tanstack/react-query";
import {
  fetchHabits,
  handleHabitServiceError,
} from "../../services/habitService";

/* -- Hook for fetching all habits for the authenticated user -- */
export const useFetchHabits = () => {
  return useQuery({
    queryKey: ["habits"],
    queryFn: fetchHabits,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

/* -- Error handler for habit fetch errors -- */
export const useHabitFetchErrorMessage = (error: unknown): string => {
  if (!error) return "";
  return handleHabitServiceError(error);
};
