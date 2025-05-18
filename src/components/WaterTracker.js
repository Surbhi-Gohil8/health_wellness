import React, { useState, useEffect } from 'react';
import './WaterTracker.css';

const MAX_CUPS = 8;

const hydrationQuotes = [
  "Drink water like your skin depends on it.",
  "Hydrate, rejuvenate, and feel great!",
  "Every sip counts towards your health.",
  "Water: The best beauty secret.",
  "Keep calm and drink water.",
  "Hydration is the key to happiness.",
  "Stay thirsty for life (and water)!",
  "Drink water, feel better, live stronger."
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

const WaterTracker = () => {
  const [cupsDrank, setCupsDrank] = useState(0);
  const [notes, setNotes] = useState('');
  const [history, setHistory] = useState({});

  // Load today's data and history on mount
  useEffect(() => {
    const today = new Date().toDateString();
    const savedData = JSON.parse(localStorage.getItem('waterLog')) || {};
    if (savedData.date === today) {
      setCupsDrank(savedData.cups || 0);
      setNotes(savedData.notes || '');
    } else {
      // Reset for new day
      localStorage.setItem('waterLog', JSON.stringify({ date: today, cups: 0, notes: '' }));
      setCupsDrank(0);
      setNotes('');
    }
    const savedHistory = JSON.parse(localStorage.getItem('waterHistory')) || {};
    setHistory(savedHistory);
  }, []);

  // Save today's data & update history on cupsDrank or notes change
  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem('waterLog', JSON.stringify({ date: today, cups: cupsDrank, notes }));

    const updatedHistory = { ...history, [today]: cupsDrank };
    setHistory(updatedHistory);
    localStorage.setItem('waterHistory', JSON.stringify(updatedHistory));
  }, [cupsDrank, notes]);

  const handleCupClick = (index) => {
    setCupsDrank(index + 1);
  };

  const reset = () => {
    setCupsDrank(0);
    setNotes('');
    const today = new Date().toDateString();
    const updatedHistory = { ...history, [today]: 0 };
    setHistory(updatedHistory);
    localStorage.setItem('waterHistory', JSON.stringify(updatedHistory));
  };

  const getDailyQuote = () => {
    const dayOfYear = Math.floor(
      (new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
    );
    return hydrationQuotes[dayOfYear % hydrationQuotes.length];
  };

  const last7Days = getLastNDays(7);

  return (
    <div className="water-tracker">
      <h2>💧 Water Intake Tracker</h2>
      <p className="progress">{cupsDrank} / {MAX_CUPS} cups</p>
      <div className="cups" role="group" aria-label="Water intake cups">
        {[...Array(MAX_CUPS)].map((_, index) => (
          <div
            key={index}
            className={`cup ${index < cupsDrank ? 'filled' : ''}`}
            onClick={() => handleCupClick(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') handleCupClick(index); }}
            aria-label={`Cup ${index + 1} ${index < cupsDrank ? 'filled' : 'empty'}`}
          />
        ))}
      </div>

      <p className="quote">💡 {getDailyQuote()}</p>

      <textarea
        placeholder="Add your hydration notes here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={4}
        className="notes"
        aria-label="Hydration notes"
      />

      <button onClick={reset} className="reset-btn">Reset</button>

      <section className="history-section">
        <h3>📅 Last 7 days history</h3>
        <div className="history-list">
          {last7Days.map(dateStr => {
            const cups = history[dateStr] ?? 0;
            return (
              <div key={dateStr} className="history-item">
                <span className="history-date">{new Date(dateStr).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                <div className="history-cups" aria-label={`Water intake for ${dateStr}`}>
                  {[...Array(MAX_CUPS)].map((_, i) => (
                    <div
                      key={i}
                      className={`cup history-cup ${i < cups ? 'filled' : ''}`}
                      aria-hidden="true"
                    />
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

export default WaterTracker;
