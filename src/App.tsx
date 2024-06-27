// App.tsx
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { NavBar } from "./components/NavBar";
import { RoutePaths } from "./common/Routes";

export const links = [
  { text: "Questionnaire", href: RoutePaths.QUESTIONNAIRE },
  { text: "Recommendations", href: RoutePaths.RECOMMENDATIONS },
  { text: "Habit Tracker", href: RoutePaths.HABIT_TRACKER },
  { text: "Log Out", href: RoutePaths.LOGIN },
];

export function App() {
  return (
    <BrowserRouter>
      <NavBar links={links} />
      <Router />
    </BrowserRouter>
  );
}
