const BASE_PATH = "/OralCheckr";

export const getFullPath = (routePath: string) => `${BASE_PATH}${routePath}`;

export enum RoutePaths {
  DASHBOARD = "/dashboard",
  HABIT_TRACKER = "/habit-tracker",
  RECOMMENDATIONS = '/recommendations',
  QUESTIONNAIRE = '/questionnaire',
  LOGIN = '/login'
}
