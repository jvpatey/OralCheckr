import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { Landing } from './pages/Landing';
import { StartQuestionnaire } from './pages/StartQuestionnaire';
import { Questionnaire } from './pages/Questionnaire';
import { Results } from './pages/Results';
import { Recommendations } from './pages/Recommendations';
import { GuardedRoute } from './containers/GuardedRoute';

export function App() {
  const isAuthenticated = localStorage.getItem('authenticated') === 'true';

  return (
    <BrowserRouter>
      <Routes>
        {/* landing page at root */}
        <Route path="/" element={<Landing />} />
        <Route
          path="/startQuestionnaire"
          element={
            <GuardedRoute>
              <StartQuestionnaire />
            </GuardedRoute>
          }
        />
        <Route path="/questionnaire" element={isAuthenticated ? <Questionnaire /> : <Navigate to="/" />} />
        <Route path="/results" element={isAuthenticated ? <Results /> : <Navigate to="/" />} />
        <Route path="/recommendations" element={isAuthenticated ? <Recommendations /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
