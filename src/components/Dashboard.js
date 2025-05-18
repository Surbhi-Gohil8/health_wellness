import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const features = [
  { name: "Mood", icon: "😊", path: "/mood" },
  { name: "Water", icon: "💧", path: "/water" },
  { name: "Breathing", icon: "🧘‍♂️", path: "/breathing" },
  { name: "Meals", icon: "🍽️", path: "/meal" },
  { name: "Sleep", icon: "🛌", path: "/sleep" },
  { name: "Fitness", icon: "🏋️", path: "/fitness" },
  { name: "Stretch", icon: "🤸‍♀️", path: "/stretch" },
  { name: "Journal", icon: "📓", path: "/journal" },
  { name: "Weight", icon: "⚖️", path: "/weight" },
  { name: "Summary", icon: "📈", path: "/summary" },
];

const Dashboard = () => (
  <div className="dashboard">
    <h2>🏥 Health Dashboard</h2>
    <div className="card-grid">
      {features.map(({ name, icon, path }) => (
        <Link to={path} key={name} className="card">
          <div className="icon">{icon}</div>
          <div className="label">{name}</div>
        </Link>
      ))}
    </div>
  </div>
);

export default Dashboard;
