// App.tsx
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { NavBar } from "./components/NavBar";
import { RoutePaths } from "./common/Routes";
import { getFullPath } from "./common/Routes";

// Define navigation links for the NavBar
export const links = [
  { text: "Dashboard", href: getFullPath(RoutePaths.DASHBOARD) },
  { text: "Questionnaire", href: getFullPath(RoutePaths.QUESTIONNAIRE) },
  { text: "Habit Tracker", href: getFullPath(RoutePaths.HABIT_TRACKER) },
  { text: "Log Out", href: getFullPath(RoutePaths.LOGIN) },
];

export function App() {
  return (
    <BrowserRouter>
      <NavBar links={links} />
      <Router />
    </BrowserRouter>
  );
}
