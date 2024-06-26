import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { GuardedRoute } from "./containers/GuardedRoute";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Questionnaire } from "./pages/Questionnaire";
import { StartQuestionnaire } from "./pages/StartQuestionnaire";
import { Landing } from "./pages/Landing";
import { HabitTacker } from "./pages/HabitTacker";
import { Recommendations } from "./pages/Recommendations";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/dashboard"
          element={
            <GuardedRoute>
              <Dashboard />
            </GuardedRoute>
          }
        />
        <Route
          path="/questionnaire"
          element={
            <GuardedRoute>
              <Questionnaire />
            </GuardedRoute>
          }
        />
        <Route
          path="/startQuestionnaire"
          element={
            <GuardedRoute>
              <StartQuestionnaire />
            </GuardedRoute>
          }
        />
        <Route
          path="/landing"
          element={
            <GuardedRoute>
              <Landing />
            </GuardedRoute>
          }
        />
        <Route
          path="/habittracker"
          element={
            <GuardedRoute>
              <HabitTacker />
            </GuardedRoute>
          }
        />
        <Route
          path="/recommendations"
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
