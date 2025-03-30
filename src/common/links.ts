import {
  faClipboardList,
  faTasksAlt,
  faArrowRightFromBracket,
  faChartSimple,
  faList,
  faSquarePollVertical,
  faUser,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { RoutePaths } from "./constants/routes";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

// Interface for links
export interface NavLink {
  name: string;
  path: string;
  icon: IconDefinition;
  displayIn: "navbar" | "sidebar";
  hideForGuest?: boolean;
  showOnlyForGuest?: boolean;
}

// Navbar links
export const navbarLinks: NavLink[] = [
  {
    name: "Profile",
    path: RoutePaths.PROFILE,
    icon: faUser,
    displayIn: "navbar",
    hideForGuest: true,
  },
  {
    name: "About",
    path: RoutePaths.ABOUT,
    icon: faInfoCircle,
    displayIn: "navbar",
    showOnlyForGuest: true,
  },
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
    path: "/",
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
