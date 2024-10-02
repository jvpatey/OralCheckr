import { faClipboardList, faTasksAlt, faArrowRightFromBracket, faChartSimple, faList, faSquarePollVertical } from "@fortawesome/free-solid-svg-icons";
import { RoutePaths } from "./constants/routes";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

// Interface for links
export interface NavLink {
  name: string;
  path: string;
  icon: IconDefinition;
  displayIn: "navbar" | "sidebar";
}

// Navbar links
export const navbarLinks: NavLink[] = [
  {
    name: "Questionnaire",
    path: RoutePaths.QUESTIONNAIRE,
    icon: faClipboardList,
    displayIn: "navbar",
  },
  {
    name: "Habit Tracker",
    path: RoutePaths.HABITS,
    icon: faTasksAlt,
    displayIn: "navbar",
  },
  {
    name: "Log Out",
    path: RoutePaths.LOGIN,
    icon: faArrowRightFromBracket,
    displayIn: "navbar",
  },
];

// Sidebar links
export const sidebarLinks: NavLink[] = [
  {
    name: "Questionnaire",
    path: RoutePaths.QUESTIONNAIRE,
    icon: faClipboardList,
    displayIn: "sidebar",
  },
  {
    name: "Habits",
    path: RoutePaths.HABITS,
    icon: faList,
    displayIn: "sidebar",
  },
  {
    name: "Analytics",
    path: RoutePaths.ANALYTICS,
    icon: faChartSimple,
    displayIn: "sidebar",
  },
  {
    name: "Results",
    path: RoutePaths.RESULTS,
    icon: faSquarePollVertical,
    displayIn: "sidebar",
  },
];
