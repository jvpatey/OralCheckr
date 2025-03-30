import { Navigate, Route, Routes } from "react-router-dom";
import { RoutePaths } from "./common/constants/routes";
import { GuardedRoute } from "./containers/authentication/GuardedRoute";
import { RedirectIfAuthenticated } from "./containers/authentication/RedirectIfAuthenticated";
import { Questionnaire } from "./containers/questionnaire/Questionnaire";
import { Habits } from "./containers/habit-tracker/habits/Habits";
import { Analytics } from "./containers/habit-tracker/analytics/Analytics";
import { Results } from "./components/questionnaire/Results";
import { Landing } from "./components/landing/Landing";
import { Welcome } from "./containers/welcome/Welcome";
import { Profile } from "./containers/profile/components/Profile";
import { About } from "./containers/about/About";
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

      {/* Questionnaire routes */}
      <Route
        path={RoutePaths.QUESTIONNAIRE}
        element={
          <GuardedRoute>
            <Questionnaire />
          </GuardedRoute>
        }
      />
      <Route
        path={`${RoutePaths.QUESTIONNAIRE}/:questionId`}
        element={
          <GuardedRoute>
            <Questionnaire />
          </GuardedRoute>
        }
      />

      {/* Profile route */}
      <Route
        path={RoutePaths.PROFILE}
        element={
          <GuardedRoute>
            <Profile />
          </GuardedRoute>
        }
      />

      {/* About route */}
      <Route path={RoutePaths.ABOUT} element={<About />} />

      {/* Wildcard route */}
      <Route
        path="*"
        element={<Navigate to={RoutePaths.LANDING} replace={true} />}
      />
    </Routes>
  );
}
