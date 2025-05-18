// SleepTracker.jsx
import React, { useState, useEffect } from 'react';
import './SleepTracker.css';

const sleepQuotes = [
  "A good laugh and a long sleep are the best cures.",
  "Sleep is the golden chain that ties health and our bodies together.",
  "The best bridge between despair and hope is a good night's sleep.",
  "Early to bed and early to rise makes a person healthy, wealthy and wise.",
  "Sleep is the best meditation."
];

// Helper to get last N days dates (including today)
const getLastNDays = (n) => {
  const days = [];
  for (let i = 0; i < n; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toDateString());
  }
  return days;
};

const SleepTracker = () => {
  const [bedtime, setBedtime] = useState('');
  const [wakeTime, setWakeTime] = useState('');
  const [sleepQuality, setSleepQuality] = useState(3);
  const [notes, setNotes] = useState('');
  const [history, setHistory] = useState({});

  // Load today data and history on mount
  useEffect(() => {
    const today = new Date().toDateString();
    const savedData = JSON.parse(localStorage.getItem('sleepLog')) || {};
    if (savedData.date === today) {
      setBedtime(savedData.bedtime || '');
      setWakeTime(savedData.wakeTime || '');
      setSleepQuality(savedData.sleepQuality || 3);
      setNotes(savedData.notes || '');
    }
    const savedHistory = JSON.parse(localStorage.getItem('sleepHistory')) || {};
    setHistory(savedHistory);
  }, []);

  // Save today data & update history on any input change
  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem(
      'sleepLog',
      JSON.stringify({ date: today, bedtime, wakeTime, sleepQuality, notes })
    );

    const updatedHistory = { ...history, [today]: { bedtime, wakeTime, sleepQuality, notes } };
    setHistory(updatedHistory);
    localStorage.setItem('sleepHistory', JSON.stringify(updatedHistory));
  }, [bedtime, wakeTime, sleepQuality, notes]);

  // Calculate total sleep hours
  const calculateSleepHours = () => {
    if (!bedtime || !wakeTime) return 0;
    const bed = new Date(`1970-01-01T${bedtime}:00`);
    let wake = new Date(`1970-01-01T${wakeTime}:00`);
    if (wake <= bed) wake.setDate(wake.getDate() + 1); // next day
    const diffMs = wake - bed;
    return (diffMs / (1000 * 60 * 60)).toFixed(2);
  };

  // Calculate sleep consistency (how many days slept between 6-9 hours)
  const last7Days = getLastNDays(7);
  const consistencyDays = last7Days.filter(dateStr => {
    const dayLog = history[dateStr];
    if (!dayLog) return false;
    const bed = dayLog.bedtime;
    const wake = dayLog.wakeTime;
    if (!bed || !wake) return false;
    let bedDate = new Date(`1970-01-01T${bed}:00`);
    let wakeDate = new Date(`1970-01-01T${wake}:00`);
    if (wakeDate <= bedDate) wakeDate.setDate(wakeDate.getDate() + 1);
    const hours = (wakeDate - bedDate) / (1000 * 60 * 60);
    return hours >= 6 && hours <= 9;
  }).length;

  // Sleep quote of the day
  const dayOfYear = Math.floor(
    (new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
  const quote = sleepQuotes[dayOfYear % sleepQuotes.length];

  const reset = () => {
    setBedtime('');
    setWakeTime('');
    setSleepQuality(3);
    setNotes('');
  };

  return (
    <div className="sleep-tracker">
      <h2>🛌 Sleep Tracker</h2>

      <div className="inputs">
        <label>
          Bedtime:
          <input
            type="time"
            value={bedtime}
            onChange={(e) => setBedtime(e.target.value)}
          />
        </label>

        <label>
          Wake Time:
          <input
            type="time"
            value={wakeTime}
            onChange={(e) => setWakeTime(e.target.value)}
          />
        </label>

        <label>
          Sleep Quality:
          <select
            value={sleepQuality}
            onChange={(e) => setSleepQuality(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? '★ Poor' : num === 5 ? '★★★★★ Excellent' : '★'.repeat(num)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p>Total Sleep Hours: <strong>{calculateSleepHours()}</strong> hours</p>

      <textarea
        placeholder="Write your sleep notes or dreams..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={4}
        className="notes"
      />

      <button onClick={reset} className="reset-btn">Reset</button>

      <section className="history-section">
        <h3>📅 Last 7 Days Sleep History</h3>
        <div className="history-list">
          {last7Days.map((dateStr) => {
            const dayLog = history[dateStr] || {};
            const sleepHours = (() => {
              if (!dayLog.bedtime || !dayLog.wakeTime) return 0;
              let bedDate = new Date(`1970-01-01T${dayLog.bedtime}:00`);
              let wakeDate = new Date(`1970-01-01T${dayLog.wakeTime}:00`);
              if (wakeDate <= bedDate) wakeDate.setDate(wakeDate.getDate() + 1);
              return ((wakeDate - bedDate) / (1000 * 60 * 60)).toFixed(2);
            })();
            return (
              <div key={dateStr} className="history-item">
                <span className="history-date">
                  {new Date(dateStr).toLocaleDateString(undefined, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                <span>Sleep: {sleepHours} hrs</span>
                <span>Quality: {dayLog.sleepQuality || '-'}</span>
              </div>
            );
          })}
        </div>
      </section>

      <p className="quote">💤 {quote}</p>

      <p className="consistency">
        Sleep consistency (6-9 hrs): <strong>{consistencyDays} / 7 days</strong>
      </p>
    </div>
  );
};

export default SleepTracker;
