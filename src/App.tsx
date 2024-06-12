import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import { LandingTest } from './pages/LandingTest';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<Landing />}></Route>
        <Route path="/appbear" element={<LandingTest />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
