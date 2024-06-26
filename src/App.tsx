// App.tsx
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { NavBar } from "./components/NavBar";
import { SideBar } from "./components/SideBar";
import { RoutePaths } from "./common/Routes";

export const links = [
  { text: "Dashboard", href: RoutePaths.DASHBOARD },
  { text: "Questionnaire", href: RoutePaths.QUESTIONNAIRE },
  { text: "Log Out", href: RoutePaths.LOGIN },
];

export const sidebarLinks = [
  { text: "Oral Health Status", href: RoutePaths.DASHBOARD },
  { text: "Habit Tracker", href: RoutePaths.HABIT_TRACKER },
  { text: "Recommendations", href: RoutePaths.RECOMMENDATIONS },
];

export function App() {
  return (
    <>
      <NavBar links={links} />
      <SideBar links={sidebarLinks} />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}
