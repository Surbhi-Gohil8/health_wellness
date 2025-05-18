// FitnessTracker.jsx
import React, { useState, useEffect } from 'react';
import './FitnessRoutine.css';

const workoutTypes = ['Running', 'Cycling', 'Yoga', 'Strength', 'Swimming', 'Other'];
const intensityLevels = ['Low', 'Medium', 'High'];

const getLastNDays = (n) => {
  const days = [];
  for (let i = 0; i < n; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toDateString());
  }
  return days;
};

const FitnessTracker = () => {
  const [workoutType, setWorkoutType] = useState(workoutTypes[0]);
  const [duration, setDuration] = useState('');
  const [intensity, setIntensity] = useState(intensityLevels[1]);
  const [history, setHistory] = useState({});

  const weeklyGoal = 150; // 150 minutes per week

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('fitnessHistory')) || {};
    setHistory(savedHistory);
  }, []);

  const today = new Date().toDateString();

  const addWorkout = () => {
    if (!duration || isNaN(duration) || duration <= 0) return alert('Please enter a valid duration');
    const todayWorkouts = history[today] || [];
    const newWorkout = { workoutType, duration: Number(duration), intensity };
    const updatedHistory = { ...history, [today]: [...todayWorkouts, newWorkout] };
    setHistory(updatedHistory);
    localStorage.setItem('fitnessHistory', JSON.stringify(updatedHistory));
    setDuration('');
    setWorkoutType(workoutTypes[0]);
    setIntensity(intensityLevels[1]);
  };

  // Calculate total duration this week (last 7 days)
  const last7Days = getLastNDays(7);
  let totalDuration = 0;
  last7Days.forEach(day => {
    if (history[day]) {
      history[day].forEach(w => (totalDuration += w.duration));
    }
  });

  // Calculate progress %
  const progressPercent = Math.min((totalDuration / weeklyGoal) * 100, 100);

  return (
    <div className="fitness-tracker">
      <h2>🏋️ Fitness Tracker</h2>

      <div className="input-group">
        <label>
          Workout Type:
          <select value={workoutType} onChange={e => setWorkoutType(e.target.value)}>
            {workoutTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>

        <label>
          Duration (minutes):
          <input
            type="number"
            min="1"
            value={duration}
            onChange={e => setDuration(e.target.value)}
            placeholder="e.g. 30"
          />
        </label>

        <label>
          Intensity:
          <select value={intensity} onChange={e => setIntensity(e.target.value)}>
            {intensityLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </label>
      </div>

      <button onClick={addWorkout} className="add-btn">Add Workout</button>

      <section className="summary">
        <h3>📊 Weekly Summary</h3>
        <p>Total Workout Time: <strong>{totalDuration} mins</strong> / {weeklyGoal} mins</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progressPercent}%` }} />
        </div>
      </section>

      <section className="history">
        <h3>📅 Last 7 Days Workout History</h3>
        <div className="history-list">
          {last7Days.map(day => {
            const dayWorkouts = history[day] || [];
            const dayDuration = dayWorkouts.reduce((sum, w) => sum + w.duration, 0);
            return (
              <div key={day} className="history-day">
                <div className="date">
                  {new Date(day).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                </div>
                <div className="duration">{dayDuration} mins</div>
                <div className="workouts">
                  {dayWorkouts.map((w, i) => (
                    <div key={i} className={`workout intensity-${w.intensity.toLowerCase()}`}>
                      {w.workoutType} ({w.duration}m, {w.intensity})
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default FitnessTracker;
