import { Navigate, Route, Routes } from "react-router-dom";
import { RoutePaths, getFullPath } from "./common/Routes";
import { GuardedRoute } from "./containers/GuardedRoute";
import { RedirectIfAuthenticated } from "./containers/RedirectIfAuthenticated";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Questionnaire } from "./pages/Questionnaire";
import { Habits } from "./pages/habittracker/Habits";
import { Analytics } from "./pages/habittracker/Analytics";
import { Results } from "./pages/Results";

export function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RedirectIfAuthenticated>
            <Login />
          </RedirectIfAuthenticated>
        }
      />
      <Route path="*" element={<Navigate to="/" replace={true} />} />
      <Route
        path={getFullPath(RoutePaths.DASHBOARD)}
        element={
          <GuardedRoute>
            <Dashboard />
          </GuardedRoute>
        }
      />
      <Route
        path={getFullPath(RoutePaths.HABITS)}
        element={
          <GuardedRoute>
            <Habits />
          </GuardedRoute>
        }
      />
      <Route
        path={getFullPath(RoutePaths.ANALYTICS)}
        element={
          <GuardedRoute>
            <Analytics />
          </GuardedRoute>
        }
      />
      {/* Use exact matching for results */}
      <Route
        path={getFullPath(RoutePaths.RESULTS)}
        element={
          <GuardedRoute>
            <Results />
          </GuardedRoute>
        }
      />
      {/* Use a more specific match for the questionnaire with optional ID */}
      <Route
        path={`${getFullPath(RoutePaths.QUESTIONNAIRE)}/:questionId`}
        element={
          <GuardedRoute>
            <Questionnaire />
          </GuardedRoute>
        }
      />
      {/* Explicitly define the questionnaire base path */}
      <Route
        path={getFullPath(RoutePaths.QUESTIONNAIRE)}
        element={
          <GuardedRoute>
            <Questionnaire />
          </GuardedRoute>
        }
      />
    </Routes>
  );
}
