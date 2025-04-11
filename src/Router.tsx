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

// Props for the router component
interface RouterProps {
  themeToggler: () => void; // Function to toggle between light and dark themes
  currentTheme: ThemeType; // Current theme state
}

// Main router component that defines all application routes
export function Router({ themeToggler, currentTheme }: RouterProps) {
  return (
    <Routes>
      {/* Root route - Welcome page for unauthenticated users */}
      <Route
        path="/"
        element={
          <RedirectIfAuthenticated>
            <Welcome themeToggler={themeToggler} theme={currentTheme} />
          </RedirectIfAuthenticated>
        }
      />

      {/* Protected routes - Only accessible to authenticated users */}
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

      {/* Questionnaire routes - Protected and dynamic */}
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

      {/* User profile route - Protected */}
      <Route
        path={RoutePaths.PROFILE}
        element={
          <GuardedRoute>
            <Profile />
          </GuardedRoute>
        }
      />

      {/* Public about page - No authentication required */}
      <Route path={RoutePaths.ABOUT} element={<About />} />

      {/* Catch-all route - Redirects to landing page */}
      <Route
        path="*"
        element={<Navigate to={RoutePaths.LANDING} replace={true} />}
      />
    </Routes>
  );
}
