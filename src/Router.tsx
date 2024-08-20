import { Navigate, Route, Routes } from "react-router-dom";
import { RoutePaths, getFullPath } from "./common/Routes";
import { GuardedRoute } from "./containers/shared/GuardedRoute";
import { RedirectIfAuthenticated } from "./containers/shared/RedirectIfAuthenticated";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Login } from "./containers/Login";
import { Questionnaire } from "./containers/questionnaire/Questionnaire";
import { Habits } from "./containers/habittracker/Habits";
import { Analytics } from "./containers/habittracker/Analytics";
import { Results } from "./components/questionnaire/Results";

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
