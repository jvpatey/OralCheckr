import { faClipboardList, faTasksAlt, faArrowRightFromBracket, faChartSimple, faList, faSquarePollVertical } from "@fortawesome/free-solid-svg-icons";
import { RoutePaths, getFullPath } from "./constants/routes";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

// Interface for links
export interface NavLink {
  name: string;
  path: string;
  icon: IconDefinition;
  displayIn: "navbar" | "sidebar" | "both";
}

// Combined links array
export const links: NavLink[] = [
  {
    name: "Questionnaire",
    path: getFullPath(RoutePaths.QUESTIONNAIRE),
    icon: faClipboardList,
    displayIn: "both",
  },
  {
    name: "Habit Tracker",
    path: getFullPath(RoutePaths.HABITS),
    icon: faTasksAlt,
    displayIn: "navbar",
  },
  {
    name: "Log Out",
    path: getFullPath(RoutePaths.LOGIN),
    icon: faArrowRightFromBracket,
    displayIn: "navbar",
  },
  {
    name: "Habits",
    path: getFullPath(RoutePaths.HABITS),
    icon: faList,
    displayIn: "sidebar",
  },
  {
    name: "Analytics",
    path: getFullPath(RoutePaths.ANALYTICS),
    icon: faChartSimple,
    displayIn: "sidebar",
  },
  {
    name: "Results",
    path: getFullPath(RoutePaths.RESULTS),
    icon: faSquarePollVertical,
    displayIn: "sidebar",
  },
];
