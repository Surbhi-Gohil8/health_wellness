import React, { useState, useEffect } from 'react';
import './MentalJournal.css';

const MentalJournal = () => {
  const [entry, setEntry] = useState('');
  const [history, setHistory] = useState(() => {
    const stored = localStorage.getItem('mentalJournal');
    return stored ? JSON.parse(stored) : [];
  });

  const handleSave = () => {
    if (!entry.trim()) return;
    const updated = [...history, { id: Date.now(), text: entry }];
    setHistory(updated);
    setEntry('');
    localStorage.setItem('mentalJournal', JSON.stringify(updated));
  };

  return (
    <div className="journal-container">
      <h2>Mental Health Journal 📝</h2>
      <div className="entry-box-wrapper">
        <textarea
          className="entry-box"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Express your thoughts..."
        />
        <button onClick={handleSave}>Save</button>
      </div>

      <div className="history-wrapper">
        <h3>Past Entries</h3>
        {history.length === 0 ? <p>No entries yet.</p> : (
          <ul className="entry-history">
            {history.map((item) => (
              <li key={item.id}>{item.text}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MentalJournal;
