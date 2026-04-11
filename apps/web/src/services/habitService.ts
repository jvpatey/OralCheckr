import {
  GET_HABITS_ENDPOINT,
  CREATE_HABIT_ENDPOINT,
  UPDATE_HABIT_ENDPOINT,
  DELETE_HABIT_ENDPOINT,
  DELETE_ALL_HABITS_ENDPOINT,
  replacePathParams,
} from "../config/habitsApiConfig";
import { apiRequest, handleApiError } from "./apiUtils";

// Define the Habit interface
export interface Habit {
  habitId?: number;
  name: string;
  count: number;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
}

/* -- Service to fetch all habits -- */
export const fetchHabits = async (): Promise<Habit[]> => {
  try {
    return await apiRequest<Habit[]>(GET_HABITS_ENDPOINT, "GET");
  } catch (error) {
    console.error("Error fetching habits:", error);
    throw error;
  }
};

/* -- Service to create a new habit -- */
export const createHabit = async (
  habit: Omit<Habit, "habitId" | "userId" | "createdAt" | "updatedAt">
): Promise<Habit> => {
  try {
    return await apiRequest<Habit>(CREATE_HABIT_ENDPOINT, "POST", habit);
  } catch (error) {
    console.error("Error creating habit:", error);
    throw error;
  }
};

/* -- Service to update an existing habit -- */
export const updateHabit = async (
  habitId: number,
  habit: Pick<Habit, "name" | "count">
): Promise<Habit> => {
  try {
    const url = replacePathParams(UPDATE_HABIT_ENDPOINT, { id: habitId });
    return await apiRequest<Habit>(url, "PUT", habit);
  } catch (error) {
    console.error("Error updating habit:", error);
    throw error;
  }
};

/* -- Service to delete a habit -- */
export const deleteHabit = async (
  habitId: number
): Promise<{ message: string }> => {
  try {
    const url = replacePathParams(DELETE_HABIT_ENDPOINT, { id: habitId });
    return await apiRequest<{ message: string }>(url, "DELETE");
  } catch (error) {
    console.error("Error deleting habit:", error);
    throw error;
  }
};

/* -- Service to delete all habits -- */
export const deleteAllHabits = async (): Promise<{ message: string }> => {
  try {
    return await apiRequest<{ message: string }>(
      DELETE_ALL_HABITS_ENDPOINT,
      "DELETE"
    );
  } catch (error) {
    console.error("Error deleting all habits:", error);
    throw error;
  }
};

/* -- Error handler for habit service errors -- */
export const handleHabitServiceError = (error: any): string => {
  return handleApiError(error, "Habit Management");
};
