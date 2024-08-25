import { Navigate, Route, Routes } from "react-router-dom";
import { RoutePaths, getFullPath } from "./common/constants/routes";
import { GuardedRoute } from "./containers/authentication/GuardedRoute";
import { RedirectIfAuthenticated } from "./containers/authentication/RedirectIfAuthenticated";
import { Login } from "./containers/Login";
import { Questionnaire } from "./containers/questionnaire/Questionnaire";
import { Habits } from "./containers/habit-tracker/habits/Habits";
import { Analytics } from "./containers/habit-tracker/analytics/Analytics";
import { Results } from "./components/questionnaire/Results";
import { Landing } from "./components/landing/Landing";

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
            <Landing />
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
