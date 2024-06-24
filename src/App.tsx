import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { Landing } from "./pages/Landing";
import { StartQuestionnaire } from "./pages/StartQuestionnaire";
import { Questionnaire } from "./pages/Questionnaire";
import { Results } from "./pages/Results";
import { Recommendations } from "./pages/Recommendations";
import { GuardedRoute } from "./containers/GuardedRoute";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/startQuestionnaire"
          element={
            <GuardedRoute>
              <StartQuestionnaire />
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
          path="/results"
          element={
            <GuardedRoute>
              <Results />
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
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
