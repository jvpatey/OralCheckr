import { Navigate, Route, Routes } from "react-router-dom";
import { RoutePaths } from "./common/constants/routes";
import { GuardedRoute } from "./containers/authentication/GuardedRoute";
import { RedirectIfAuthenticated } from "./containers/authentication/RedirectIfAuthenticated";
import { Questionnaire } from "./containers/questionnaire/Questionnaire";
import { Habits } from "./containers/habit-tracker/habits/Habits";
import { Analytics } from "./containers/habit-tracker/analytics/Analytics";
import { Results } from "./components/questionnaire/Results";
import { Landing } from "./components/landing/Landing";
import { Welcome } from "./components/welcome/Welcome";
import { WelcomeResults } from "./components/welcome/WelcomeResults";
import { ThemeType } from "./App";

interface RouterProps {
  themeToggler: () => void;
  currentTheme: ThemeType;
}

export function Router({ themeToggler, currentTheme }: RouterProps) {
  return (
    <Routes>
      {/* Welcome page as root */}
      <Route
        path="/"
        element={
          <RedirectIfAuthenticated>
            <Welcome themeToggler={themeToggler} theme={currentTheme} />
          </RedirectIfAuthenticated>
        }
      />

      {/* Authenticated routes (Landing, Habits, Analytics, Results) */}
      <Route
        path={RoutePaths.LANDING}
        element={
          <GuardedRoute>
            <Landing />
          </GuardedRoute>
        }
      />
      <Route
        path={RoutePaths.HABITS}
        element={
          <GuardedRoute>
            <Habits />
          </GuardedRoute>
        }
      />
      <Route
        path={RoutePaths.ANALYTICS}
        element={
          <GuardedRoute>
            <Analytics />
          </GuardedRoute>
        }
      />
      <Route
        path={RoutePaths.RESULTS}
        element={
          <GuardedRoute>
            <Results />
          </GuardedRoute>
        }
      />

      {/* Questionnaire routes accessible without authentication */}
      <Route path={RoutePaths.QUESTIONNAIRE} element={<Questionnaire />} />
      <Route path={`${RoutePaths.QUESTIONNAIRE}/:questionId`} element={<Questionnaire />} />
      <Route path={RoutePaths.WELCOME_RESULTS} element={<WelcomeResults themeToggler={themeToggler} theme={currentTheme} />} />

      {/* Wildcard route */}
      <Route path="*" element={<Navigate to={RoutePaths.LANDING} replace={true} />} />
    </Routes>
  );
}
