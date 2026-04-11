import {
  GET_HABIT_LOGS_ENDPOINT,
  INCREMENT_HABIT_LOG_ENDPOINT,
  DECREMENT_HABIT_LOG_ENDPOINT,
  replacePathParams,
} from "../config/habitsApiConfig";
import { apiRequest, formatDateForApi, handleApiError } from "./apiUtils";

// HabitLog interface
export interface HabitLog {
  id?: number;
  habitId: number;
  date: string; // ISO format: YYYY-MM-DD
  count: number;
  habitName?: string | null;
}

// Response structure for habit logs
export interface HabitLogResponse {
  logs?: HabitLog[];
  log?: HabitLog | null;
  deleted?: boolean;
}

/* -- Service to fetch habit logs -- */
export const fetchHabitLogs = async (
  habitId: number,
  year?: number,
  month?: string
): Promise<HabitLogResponse> => {
  try {
    const url = replacePathParams(GET_HABIT_LOGS_ENDPOINT, { habitId });

    // Add query parameters if provided
    const queryParams = new URLSearchParams();
    if (year) queryParams.append("year", year.toString());
    if (month) queryParams.append("month", month);

    const queryString = queryParams.toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    return await apiRequest<HabitLogResponse>(fullUrl, "GET");
  } catch (error) {
    console.error("Error fetching habit logs:", error);
    throw error;
  }
};

/* -- Service to increment a habit log count -- */
export const incrementHabitLog = async (
  habitId: number,
  date: Date
): Promise<HabitLogResponse> => {
  try {
    const url = replacePathParams(INCREMENT_HABIT_LOG_ENDPOINT, { habitId });
    const dateParams = formatDateForApi(date);

    return await apiRequest<HabitLogResponse>(url, "POST", dateParams);
  } catch (error) {
    console.error("Error incrementing habit log:", error);
    throw error;
  }
};

/* -- Service to decrement a habit log count -- */
export const decrementHabitLog = async (
  habitId: number,
  date: Date
): Promise<HabitLogResponse> => {
  try {
    const url = replacePathParams(DECREMENT_HABIT_LOG_ENDPOINT, { habitId });
    const dateParams = formatDateForApi(date);

    return await apiRequest<HabitLogResponse>(url, "POST", dateParams);
  } catch (error) {
    console.error("Error decrementing habit log:", error);
    throw error;
  }
};

/* -- Error handler for habit log service errors -- */
export const handleHabitLogServiceError = (error: any): string => {
  return handleApiError(error, "Habit Logging");
};
