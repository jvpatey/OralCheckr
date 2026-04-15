import {
  faArrowRightFromBracket,
  faChartSimple,
  faUser,
  faClipboardCheck,
  faHouse,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import {
  faClipboard,
  faRectangleList,
  faCircleQuestion,
} from "@fortawesome/free-regular-svg-icons";
import { RoutePaths } from "./constants/routes";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

/* -- Links for the navbar and sidebar -- */

// Interface for links
export interface NavLink {
  name: string;
  path: string;
  icon: IconDefinition;
  displayIn: "navbar" | "sidebar";
  hideForGuest?: boolean;
  showOnlyForGuest?: boolean;
}

// Links for the navbar
export const navbarLinks: NavLink[] = [
  {
    name: "Dashboard",
    path: RoutePaths.LANDING,
    icon: faHouse,
    displayIn: "navbar",
  },
  {
    name: "Profile",
    path: RoutePaths.PROFILE,
    icon: faUser,
    displayIn: "navbar",
    hideForGuest: true,
  },
  {
    name: "Support",
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

// Links for the sidebar
export const sidebarLinks: NavLink[] = [
  {
    name: "Questionnaire",
    path: RoutePaths.QUESTIONNAIRE,
    icon: faClipboard as IconDefinition,
    displayIn: "sidebar",
  },
  {
    name: "Habit Tracker",
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
    name: "Oral Health Summary",
    path: RoutePaths.RESULTS,
    icon: faClipboardCheck as IconDefinition,
    displayIn: "sidebar",
  },
  {
    name: "Oral Health Report",
    path: RoutePaths.APPOINTMENT_SUMMARY,
    icon: faFileLines as IconDefinition,
    displayIn: "sidebar",
  },
];
