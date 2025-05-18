import React, { useState, useEffect } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { motion } from 'framer-motion';
import { ArrowLeft} from "lucide-react";
import useSound from 'use-sound';
import './Breathing.css';
import chimeSound from '../assests/audio/chime.mp3';
import ambientSound from '../assests/audio/ambient.mp3';

const BreathingExercise = ({ onBack }) => {
  const [duration, setDuration] = useState(60);
  const [remaining, setRemaining] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState('inhale');
  const [soundOn, setSoundOn] = useState(true);

  const [playChime] = useSound(chimeSound, { volume: 0.5 });
  const [playAmbient, { stop: stopAmbient }] = useSound(ambientSound, { loop: true, volume: 0.3 });

  useEffect(() => {
    let timer;
    if (!isRunning) return;

    if (phase === 'inhale') {
      timer = setTimeout(() => { setPhase('hold'); if (soundOn) playChime(); }, 4000);
    } else if (phase === 'hold') {
      timer = setTimeout(() => { setPhase('exhale'); if (soundOn) playChime(); }, 7000);
    } else if (phase === 'exhale') {
      timer = setTimeout(() => { setPhase('inhale'); if (soundOn) playChime(); }, 8000);
    }

    return () => clearTimeout(timer);
  }, [phase, isRunning]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          stopAmbient();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const startBreathing = () => {
    setRemaining(duration);
    setPhase('inhale');
    setIsRunning(true);
    if (soundOn) playAmbient();
  };
  const stopBreathing = () => {
  setIsRunning(false);
  stopAmbient();
};


  return (
    <div className="breathing-container">
      <button className="back-button" onClick={() => window.location.href = "/Dashboard"}>
        <ArrowLeft size={20} style={{ marginRight: '6px' }} /> 
      </button>

      <h2>Breathing Exercise</h2>

      <div className="duration-buttons">
        {[60, 180, 300].map((sec) => (
          <button
            key={sec}
            className={`duration-btn ${duration === sec ? 'active' : ''}`}
            onClick={() => { setDuration(sec); setRemaining(sec); }}
          >
            {sec / 60} min
          </button>
        ))}
      </div>

      <div className="circle-wrapper">
        <CountdownCircleTimer
          isPlaying={isRunning}
          duration={duration}
          size={240}
          strokeWidth={8}
          colors={['#7FDBFF', '#2ECC40', '#FF4136']}
          colorsTime={[duration, duration / 2, 0]}
        >
          {({ remainingTime }) => (
            <div className="inner-circle">
              <motion.div
                className="breathing-circle"
                animate={{ scale: phase === 'inhale' ? 1.3 : 1 }}
                transition={{ duration: phase === 'inhale' ? 4 : 8 }}
              >
                {phase.toUpperCase()}
              </motion.div>
              <div className="timer">
                {String(Math.floor(remainingTime / 60)).padStart(2, '0')}:
                {String(remainingTime % 60).padStart(2, '0')}
              </div>
            </div>
          )}
        </CountdownCircleTimer>
      </div>

      <div className="control-buttons">
        <button onClick={startBreathing} className="start-btn">Start</button>
        <button onClick={stopBreathing} className="stop-btn">Stop</button>
        <button onClick={() => setSoundOn(!soundOn)} className="sound-btn">
          {soundOn ? '🔊 Sound On' : '🔇 Sound Off'}
        </button>
      </div>
    </div>
  );
};

export default BreathingExercise;
