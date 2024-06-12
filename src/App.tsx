import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<Landing />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
