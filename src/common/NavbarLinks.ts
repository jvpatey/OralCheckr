import { faClipboardList, faTasksAlt, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { RoutePaths, getFullPath } from "./Routes";

export const navbarLinks = [
  {
    text: "Questionnaire",
    href: getFullPath(RoutePaths.QUESTIONNAIRE),
    icon: faClipboardList,
  },
  {
    text: "Habit Tracker",
    href: getFullPath(RoutePaths.HABITS),
    icon: faTasksAlt,
  },
  {
    text: "Log Out",
    href: getFullPath(RoutePaths.LOGIN),
    icon: faArrowRightFromBracket,
  },
];
