import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MoodTracker.css';

const moods = [
  { emoji: '😊', color: '#f1c40f', label: 'Happy', quote: "Keep smiling, life's beautiful!" },
  { emoji: '😐', color: '#95a5a6', label: 'Neutral', quote: "Balance is the key." },
  { emoji: '😞', color: '#3498db', label: 'Sad', quote: "Every storm runs out of rain." },
  { emoji: '😠', color: '#e74c3c', label: 'Angry', quote: "Breathe deep, calm your mind." },
  { emoji: '😍', color: '#e84393', label: 'Loved', quote: "Love yourself first." },
];

const MoodTracker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [moodLog, setMoodLog] = useState({});
  const [currentMoodIndex, setCurrentMoodIndex] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('moodLog');
    if (stored) setMoodLog(JSON.parse(stored));
    const todayKey = new Date().toDateString();
    const todayMood = JSON.parse(stored || '{}')[todayKey];
    if (todayMood !== undefined) setCurrentMoodIndex(todayMood);
  }, []);

  const logMood = (index) => {
    const dateKey = selectedDate.toDateString();
    const updated = { ...moodLog, [dateKey]: index };
    setMoodLog(updated);
    localStorage.setItem('moodLog', JSON.stringify(updated));
    if (dateKey === new Date().toDateString()) setCurrentMoodIndex(index);
  };

  const tileContent = ({ date, view }) => {
    if (view !== 'month') return null;
    const today = new Date().toDateString();
    if (date.toDateString() === today) {
      const moodIndex = moodLog[today];
      if (moodIndex !== undefined) {
        return (
          <div
            className="mood-tile"
            style={{ backgroundColor: moods[moodIndex].color }}
            title={moods[moodIndex].label}
          >
            {moods[moodIndex].emoji}
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="mood-tracker">
      <h2>How do you feel today?</h2>
      <div className="emoji-buttons">
        {moods.map((mood, index) => (
          <button
            key={index}
            onClick={() => logMood(index)}
            className={currentMoodIndex === index ? 'selected' : ''}
            style={{ borderColor: currentMoodIndex === index ? mood.color : 'transparent' }}
            aria-label={mood.label}
            title={mood.label}
          >
            {mood.emoji}
          </button>
        ))}
      </div>
      {currentMoodIndex !== null && (
        <p className="mood-quote">{moods[currentMoodIndex].quote}</p>
      )}
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileContent={tileContent}
        tileClassName={({ date, view }) => 
          view === 'month' && date.toDateString() === selectedDate.toDateString()
            ? 'selected-date'
            : null
        }
      />
    </div>
  );
};

export default MoodTracker;
