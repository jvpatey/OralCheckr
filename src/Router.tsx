import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { RoutePaths } from "./common/Routes";
import { GuardedRoute } from "./containers/GuardedRoute";
import { Dashboard } from "./pages/Dashboard";
import { HabitTracker } from "./pages/HabitTracker";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Questionnaire } from "./pages/Questionnaire";
import { StartQuestionnaire } from "./pages/StartQuestionnaire";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />
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
        path={RoutePaths.LANDING}
        element={
          <GuardedRoute>
            <Landing />
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
