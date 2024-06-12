import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Landing } from "./pages/Landing";
import { StartQuestionnaire } from "./pages/StartQuestionnaire";
import { Questionnaire } from "./pages/Questionnaire";
import { Results } from "./pages/Results";
import { Recommendations } from "./pages/Recommendations";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>{" "}
        {/* landing page at root */}
        <Route
          path="/startQuestionnaire"
          element={<StartQuestionnaire />}
        ></Route>
        <Route path="/questionnaire" element={<Questionnaire />}></Route>
        <Route path="/results" element={<Results />}></Route>
        <Route path="/recommendations" element={<Recommendations />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
