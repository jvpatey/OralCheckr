import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { RoutePaths, getFullPath } from "./common/Routes";
import { GuardedRoute } from "./containers/GuardedRoute";
import { RedirectIfAuthenticated } from "./containers/RedirectIfAuthenticated";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Questionnaire } from "./pages/Questionnaire";
import { Habits } from "./pages/habittracker/Habits";
import { Calendar } from "./pages/habittracker/Calendar";
import { Analytics } from "./pages/habittracker/Analytics";

export function Router() {
  return (
    <Routes>
      {/* Redirect to login page if user is not authenticated */}
      <Route
        path="/"
        element={
          <RedirectIfAuthenticated>
            <Login />
          </RedirectIfAuthenticated>
        }
      />
      {/* Catch-all route that redirects to the login page */}
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
        path={getFullPath(RoutePaths.CALENDAR)}
        element={
          <GuardedRoute>
            <Calendar />
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
      {/* Questionnaire route guarded by authentication, with optional questionId parameter */}
      <Route
        path={`${getFullPath(RoutePaths.QUESTIONNAIRE)}/:questionId?`}
        element={
          <GuardedRoute>
            <Questionnaire />
          </GuardedRoute>
        }
      />
    </Routes>
  );
}
