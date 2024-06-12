import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { Landing } from "./pages/Landing";
import { StartQuestionnaire } from "./pages/StartQuestionnaire";
import { Questionnaire } from "./pages/Questionnaire";
import { Results } from "./pages/Results";
import { Recommendations } from "./pages/Recommendations";

export function App() {
  const isAuthenticated = localStorage.getItem("authenticated") === "true";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>{" "}
        {/* landing page at root */}
        <Route
          path="/startQuestionnaire"
          element={
            isAuthenticated ? <StartQuestionnaire /> : <Navigate to="/" />
          }
        />
        <Route
          path="/questionnaire"
          element={isAuthenticated ? <Questionnaire /> : <Navigate to="/" />}
        />
        <Route
          path="/results"
          element={isAuthenticated ? <Results /> : <Navigate to="/" />}
        />
        <Route
          path="/recommendations"
          element={isAuthenticated ? <Recommendations /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
