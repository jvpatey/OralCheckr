import { Navigate, Route, Routes } from "react-router-dom";
import { RoutePaths, getFullPath } from "./common/Routes";
import { GuardedRoute } from "./containers/shared/GuardedRoute";
import { RedirectIfAuthenticated } from "./containers/shared/RedirectIfAuthenticated";
import { Login } from "./containers/Login";
import { Questionnaire } from "./containers/questionnaire/Questionnaire";
import { Habits } from "./containers/habittracker/Habits";
import { Analytics } from "./containers/habittracker/Analytics";
import { Results } from "./components/questionnaire/Results";
import { Dashboard } from "./components/dashboard/Dashboard";

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
      <Route
        path={getFullPath(RoutePaths.LANDING)}
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
      <Route
        path={getFullPath(RoutePaths.RESULTS)}
        element={
          <GuardedRoute>
            <Results />
          </GuardedRoute>
        }
      />
      {/* Questionnaire path with dynamic question ID */}
      <Route
        path={`${getFullPath(RoutePaths.QUESTIONNAIRE)}/:questionId`}
        element={
          <GuardedRoute>
            <Questionnaire />
          </GuardedRoute>
        }
      />
      <Route
        path={getFullPath(RoutePaths.QUESTIONNAIRE)}
        element={
          <GuardedRoute>
            <Questionnaire />
          </GuardedRoute>
        }
      />
      {/* Wildcard route to catch all other routes */}
      <Route
        path="*"
        element={
          <Navigate to={getFullPath(RoutePaths.LANDING)} replace={true} />
        }
      />
    </Routes>
  );
}
