import {
  faArrowRightFromBracket,
  faChartSimple,
  faUser,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
  faClipboard,
  faRectangleList,
  faCircleQuestion,
} from "@fortawesome/free-regular-svg-icons";
import { RoutePaths } from "./constants/routes";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

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
    icon: faCircleQuestion as IconDefinition,
    displayIn: "navbar",
  },
  {
    name: "Questionnaire",
    path: RoutePaths.QUESTIONNAIRE,
    icon: faClipboard as IconDefinition,
    displayIn: "navbar",
  },
  {
    name: "Habit Tracker",
    path: RoutePaths.HABITS,
    icon: faRectangleList as IconDefinition,
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
    icon: faClipboard as IconDefinition,
    displayIn: "sidebar",
  },
  {
    name: "Habits",
    path: RoutePaths.HABITS,
    icon: faRectangleList as IconDefinition,
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
    icon: faClipboardCheck as IconDefinition,
    displayIn: "sidebar",
  },
];
