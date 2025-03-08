export const API_BASE_URL = "http://localhost:3000";

// Habit Endpoints
export const GET_HABITS_ENDPOINT = `${API_BASE_URL}/habits`;
export const CREATE_HABIT_ENDPOINT = `${API_BASE_URL}/habits`;
export const UPDATE_HABIT_ENDPOINT = `${API_BASE_URL}/habits/:id`;
export const DELETE_HABIT_ENDPOINT = `${API_BASE_URL}/habits/:id`;
export const DELETE_ALL_HABITS_ENDPOINT = `${API_BASE_URL}/habits`;

// Habit Log Endpoints
export const GET_HABIT_LOGS_ENDPOINT = `${API_BASE_URL}/habit-logs/:habitId`;
export const INCREMENT_HABIT_LOG_ENDPOINT = `${API_BASE_URL}/habit-logs/:habitId/increment`;
export const DECREMENT_HABIT_LOG_ENDPOINT = `${API_BASE_URL}/habit-logs/:habitId/decrement`;

// Helper function to replace path parameters
export const replacePathParams = (
  url: string,
  params: Record<string, string | number>
) => {
  let result = url;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`:${key}`, value.toString());
  });
  return result;
};
