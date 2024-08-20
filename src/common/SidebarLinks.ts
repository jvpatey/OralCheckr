import { getFullPath } from "./Routes";
import { RoutePaths } from "./Routes";
import {
  faChartSimple,
  faList,
  faClipboardList,
  faSquarePollVertical,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";

// Interface for sidebar links
export interface SidebarLink {
  name: string;
  path: string;
  icon: IconDefinition;
}

// Links array with icons for the habit tracker
export const habitTrackerLinks: SidebarLink[] = [
  { name: "Habits", path: getFullPath(RoutePaths.HABITS), icon: faList },
  { name: "Analytics", path: getFullPath(RoutePaths.ANALYTICS), icon: faChartSimple },
];

// Links array with icons for the questionnaire
export const questionnaireLinks: SidebarLink[] = [
  { name: "Questionnaire", path: getFullPath(RoutePaths.QUESTIONNAIRE), icon: faClipboardList },
  { name: "Results", path: getFullPath(RoutePaths.RESULTS), icon: faSquarePollVertical },
];