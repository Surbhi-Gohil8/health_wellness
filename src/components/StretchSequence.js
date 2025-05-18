import React, { useState, useEffect } from "react";
import "./StretchSequence.css";

const stretches = [
  {
    name: "Neck Stretch",
    duration: 15,
    emoji: "🧖‍♂️",
    description: "Slowly tilt your head side to side to relieve tension.",
  },
  {
    name: "Shoulder Rolls",
    duration: 20,
    emoji: "🤸‍♀️",
    description: "Roll your shoulders forward and backward gently.",
  },
  {
    name: "Arm Stretch",
    duration: 15,
    emoji: "💪",
    description: "Extend your arms overhead and stretch your sides.",
  },
  {
    name: "Cat-Cow Pose",
    duration: 20,
    emoji: "🐱🐮",
    description: "Arch your back up and down slowly to loosen your spine.",
  },
  {
    name: "Seated Forward Bend",
    duration: 25,
    emoji: "🧘‍♀️",
    description: "Reach forward towards your toes with a straight back.",
  },
  {
    name: "Quad Stretch",
    duration: 20,
    emoji: "🦵",
    description: "Pull one foot towards your buttocks to stretch the front thigh.",
  },
  {
    name: "Side Stretch",
    duration: 20,
    emoji: "↔️",
    description: "Reach one arm over your head and bend to the opposite side.",
  },
  {
    name: "Wrist Stretch",
    duration: 15,
    emoji: "🤲",
    description: "Extend your arm with palm facing up and gently pull fingers back.",
  },
];

export default function StretchSequence() {
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(stretches[0].duration);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    if (timeLeft === 0) {
      if (current < stretches.length - 1) {
        setCurrent(current + 1);
        setTimeLeft(stretches[current + 1].duration);
      } else {
        setRunning(false);
      }
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, running, current]);

  function handleStart() {
    setRunning(true);
  }

  function handlePause() {
    setRunning(false);
  }

  function handleReset() {
    setRunning(false);
    setCurrent(0);
    setTimeLeft(stretches[0].duration);
  }

  return (
    <div className="stretch-container">
      <h2 className="stretch-title">✨ Daily Stretch Sequence ✨</h2>

      <div className="stretch-card">
        <div className="stretch-emoji">{stretches[current].emoji}</div>
        <h3 className="stretch-name">{stretches[current].name}</h3>
        <p className="stretch-desc">{stretches[current].description}</p>

        <div className="timer-container">
          <div className="time-left">{timeLeft}s</div>
          <progress
            className="progress-bar"
            value={stretches[current].duration - timeLeft}
            max={stretches[current].duration}
          />
        </div>

        <div className="buttons">
          {!running && (
            <button onClick={handleStart} className="btn start-btn">
              ▶ Start
            </button>
          )}
          {running && (
            <button onClick={handlePause} className="btn pause-btn">
              ⏸ Pause
            </button>
          )}
          <button onClick={handleReset} className="btn reset-btn">
            🔄 Reset
          </button>
        </div>
      </div>

      <div className="progress-bar-container">
        {stretches.map((_, i) => (
          <div
            key={i}
            className={`progress-step ${i === current ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
