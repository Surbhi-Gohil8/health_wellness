import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import MoodTracker from './components/MoodTracker';
import WaterTracker from './components/WaterTracker';
import Breathing from './components/Breathing';
import MealLog from './components/MealLog';
import SleepTracker from './components/SleepTracker';
import FitnessRoutine from './components/FitnessRoutine';

import './App.css';
import StretchSequence from './components/StretchSequence';
import MentalJournal from './components/MentalJournal';
import WeightTracker from './components/WeightTracker';
import HealthSummary from './components/HealthSummary';

function App() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="app">
      <div className="main-layout">
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/mood" element={<MoodTracker />} />
            <Route path="/water" element={<WaterTracker />} />
            <Route path="/breathing" element={<Breathing />} />
            <Route path="/meal" element={<MealLog />} />
            <Route path="/sleep" element={<SleepTracker />} />
            <Route path="/fitness" element={<FitnessRoutine />} />
            <Route path="/stretch" element={<StretchSequence />} />
            <Route path="/journal" element={<MentalJournal />} />
            <Route path="/weight" element={<WeightTracker />} />
            <Route path="/summary" element={<HealthSummary />} />
          </Routes>
        </div>

        <nav className="bottom-nav">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} title="Home">
            <div className="nav-icon">🏠</div>
            <span>Home</span>
          </Link>
          <Link to="/mood" className={`nav-link ${isActive('/mood') ? 'active' : ''}`} title="Mood">
            <div className="nav-icon">😊</div>
            <span>Mood</span>
          </Link>
          <Link to="/water" className={`nav-link ${isActive('/water') ? 'active' : ''}`} title="Water">
            <div className="nav-icon">💧</div>
            <span>Water</span>
          </Link>
          <Link to="/breathing" className={`nav-link ${isActive('/breathing') ? 'active' : ''}`} title="Breathing">
            <div className="nav-icon">🧘‍♂️</div>
            <span>Breath</span>
          </Link>
          <Link to="/meal" className={`nav-link ${isActive('/meal') ? 'active' : ''}`} title="Meal">
            <div className="nav-icon">🍽️</div>
            <span>Meal</span>
          </Link>
          <Link to="/sleep" className={`nav-link ${isActive('/sleep') ? 'active' : ''}`} title="Sleep">
            <div className="nav-icon">🛌</div>
            <span>Sleep</span>
          </Link>
          <Link to="/fitness" className={`nav-link ${isActive('/fitness') ? 'active' : ''}`} title="Fitness">
            <div className="nav-icon">🏋️‍♂️</div>
            <span>Fitness</span>
          </Link>
           <Link to="/stretch" className={`nav-link ${isActive('/stretch') ? 'active' : ''}`} title="Stretch">
            <div className="nav-icon">🤸‍♀️</div>
            <span>Fitness</span>
          </Link>
           <Link to="/journal" className={`nav-link ${isActive('/journal') ? 'active' : ''}`} title="Journal">
            <div className="nav-icon">📓</div>
            <span>Journal</span>
          </Link>
          <Link to="/weight" className={`nav-link ${isActive('/weight') ? 'active' : ''}`} title="Weight">
            <div className="nav-icon">⚖️</div>
            <span>Weight</span>
          </Link>
          <Link to="/summary" className={`nav-link ${isActive('/summary') ? 'active' : ''}`} title="Summary">
            <div className="nav-icon">📈</div>
            <span>Summary</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}

// Wrap the App inside Router here so useLocation works properly
export default function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}
