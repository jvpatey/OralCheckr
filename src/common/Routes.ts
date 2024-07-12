// Base path for the application
const BASE_PATH = "/OralCheckr";

// Function to get the full path for a given route
export const getFullPath = (routePath: string) => `${BASE_PATH}${routePath}`;

export enum RoutePaths {
  DASHBOARD = "/dashboard",
  HABIT_TRACKER = "/habit-tracker",
  RECOMMENDATIONS = '/recommendations',
  QUESTIONNAIRE = '/questionnaire',
  LOGIN = '/login'
}
