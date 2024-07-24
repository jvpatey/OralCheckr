// App.tsx
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { NavBar } from "./components/NavBar";
import { RoutePaths, getFullPath } from "./common/Routes";
import {
  faTachometerAlt,
  faClipboardList,
  faTasksAlt,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

// Define navigation links for the NavBar
export const links = [
  {
    text: "Dashboard",
    href: getFullPath(RoutePaths.DASHBOARD),
    icon: faTachometerAlt,
  },
  {
    text: "Questionnaire",
    href: getFullPath(RoutePaths.QUESTIONNAIRE),
    icon: faClipboardList,
  },
  {
    text: "Habit Tracker",
    href: getFullPath(RoutePaths.CALENDAR),
    icon: faTasksAlt,
  },
  {
    text: "Log Out",
    href: getFullPath(RoutePaths.LOGIN),
    icon: faArrowRightFromBracket,
  },
];

export function App() {
  return (
    <BrowserRouter>
      <NavBar links={links} />
      <Router />
    </BrowserRouter>
  );
}
