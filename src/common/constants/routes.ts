// Base path for the application
const BASE_PATH = "/OralCheckr";

// Function to get the full path for a given route
export const getFullPath = (routePath: string) => `${BASE_PATH}${routePath}`;

export enum RoutePaths {
  LOGIN = '/login',
  LANDING = "/", 
  QUESTIONNAIRE = '/questionnaire',
  HABITS = '/habit-tracker',
  ANALYTICS = '/habit-tracker/analytics',
  RESULTS = '/questionnaire/results'
}
