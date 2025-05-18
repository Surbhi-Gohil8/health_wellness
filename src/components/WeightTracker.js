import React, { useState, useEffect } from 'react';
import './WeightTracker.css';
export default function WeightTracker() {
  // Load entries from localStorage or start empty
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('weightEntries');
    return saved ? JSON.parse(saved) : [];
  });

  const [date, setDate] = useState('');
  const [weight, setWeight] = useState('');

  // Save entries to localStorage on every change
  useEffect(() => {
    localStorage.setItem('weightEntries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    if (!date || !weight) {
      alert('Please enter both date and weight');
      return;
    }

    // Check if weight is a positive number
    const parsedWeight = parseFloat(weight);
    if (isNaN(parsedWeight) || parsedWeight <= 0) {
      alert('Please enter a valid positive weight');
      return;
    }

    const newEntry = { date, weight: parsedWeight.toFixed(1) };

    setEntries(prevEntries => [newEntry, ...prevEntries]);
    setDate('');
    setWeight('');
  };

  const deleteEntry = (index) => {
    setEntries(prevEntries => prevEntries.filter((_, i) => i !== index));
  };

  return (
    <div className="weight-tracker">
      <h2>Weight Tracker</h2>

      <div className="input-group">
       
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Weight (kg)"
          min="0"
          step="0.1"
        />
         <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          max={new Date().toISOString().split('T')[0]}
        />
        <button onClick={addEntry}>Add</button>
      </div>

      {entries.length === 0 ? (
        <p>No entries yet</p>
      ) : (
        <ul className="entries-list">
          {entries.map((entry, index) => (
            <li key={index}>
              <span>{entry.date}</span> - <span>{entry.weight} kg</span>
              <button onClick={() => deleteEntry(index)} aria-label="Delete">
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
