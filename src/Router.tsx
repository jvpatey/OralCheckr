import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { RoutePaths } from "./common/Routes";
import { GuardedRoute } from "./containers/GuardedRoute";
import { RedirectIfAuthenticated } from "./containers/RedirectIfAuthenticated";
import { Dashboard } from "./pages/Dashboard";
import { HabitTracker } from "./pages/HabitTracker";
import { Login } from "./pages/Login";
import { Questionnaire } from "./pages/Questionnaire";
import { StartQuestionnaire } from "./pages/StartQuestionnaire";

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
        path={RoutePaths.DASHBOARD}
        element={
          <GuardedRoute>
            <Dashboard />
          </GuardedRoute>
        }
      />
      <Route
        path={RoutePaths.QUESTIONNAIRE}
        element={
          <GuardedRoute>
            <Questionnaire />
          </GuardedRoute>
        }
      />
      <Route
        path={RoutePaths.START_QUESTIONNAIRE}
        element={
          <GuardedRoute>
            <StartQuestionnaire />
          </GuardedRoute>
        }
      />
      <Route
        path={RoutePaths.HABIT_TRACKER}
        element={
          <GuardedRoute>
            <HabitTracker />
          </GuardedRoute>
        }
      />
    </Routes>
  );
}
