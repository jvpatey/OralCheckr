import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { RoutePaths, getFullPath } from "./common/Routes";
import { GuardedRoute } from "./containers/GuardedRoute";
import { RedirectIfAuthenticated } from "./containers/RedirectIfAuthenticated";
import { Dashboard } from "./pages/Dashboard";
import { HabitTracker } from "./pages/HabitTracker";
import { Login } from "./pages/Login";
import { Questionnaire } from "./pages/Questionnaire";

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
        path={getFullPath(RoutePaths.HABIT_TRACKER)}
        element={
          <GuardedRoute>
            <HabitTracker />
          </GuardedRoute>
        }
      />
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
