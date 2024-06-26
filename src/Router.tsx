import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { GuardedRoute } from "./containers/GuardedRoute";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Questionnaire } from "./pages/Questionnaire";
import { StartQuestionnaire } from "./pages/StartQuestionnaire";
import { Landing } from "./pages/Landing";
import { HabitTracker } from "./pages/HabitTracker";
import { Recommendations } from "./pages/Recommendations";
import { RoutePaths } from "./common/Routes";

export function Router() {
  return (
    <BrowserRouter>
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
        <Route
          path={RoutePaths.RECOMMENDATIONS}
          element={
            <GuardedRoute>
              <Recommendations />
            </GuardedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
