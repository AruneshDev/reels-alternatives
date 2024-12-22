import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FunEventsPage from './pages/FunEventsPage';
import GoalsPage from './pages/GoalsPage';
import JournalPage from './pages/JournalPage';
import DeepWorkPage from './pages/DeepWorkPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/fun-events" element={<FunEventsPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/deep-work" element={<DeepWorkPage />} />
      </Routes>
    </Router>
  );
}

export default App;
