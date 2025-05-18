// src/components/HealthSummary.js
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell,
} from 'recharts';

const moodData = [
  { name: 'Happy', value: 40 },
  { name: 'Neutral', value: 30 },
  { name: 'Sad', value: 15 },
  { name: 'Angry', value: 10 },
  { name: 'Excited', value: 5 },
];

const COLORS = ['#f39c12', '#3498db', '#8e44ad', '#e74c3c', '#27ae60'];

const barData = [
  { name: 'Water (cups)', value: 6 },
  { name: 'Sleep (hrs)', value: 7 },
  { name: 'Fitness (sessions)', value: 4 },
];

export default function HealthSummary() {
  const summaryData = {
    journalEntries: 12,
    weight: 70, // kg
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif', maxWidth: 700, margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#4a90e2' }}>Your Health Summary</h1>

      {/* Charts stacked vertically */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
        {/* Pie chart for mood */}
        <div style={{ marginBottom: 40 }}>
          <h3 style={{ textAlign: 'center' }}>Mood Distribution</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={moodData}
              cx={150}
              cy={150}
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {moodData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Bar chart for water, sleep, fitness */}
        <div>
          <h3 style={{ textAlign: 'center' }}>Activity Overview</h3>
          <BarChart
            width={300}
            height={300}
            data={barData}
            margin={{
              top: 20, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#4a90e2" />
          </BarChart>
        </div>
      </div>

      {/* Other summary cards */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 40 }}>
        <div style={cardStyle}>
          <h3>Journal Entries</h3>
          <div style={bigNumber}>{summaryData.journalEntries}</div>
        </div>
        <div style={cardStyle}>
          <h3>Weight</h3>
          <div style={bigNumber}>{summaryData.weight} kg</div>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: '#fff',
  padding: '15px 20px',
  borderRadius: 12,
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  textAlign: 'center',
  width: 150,
};

const bigNumber = {
  fontSize: 36,
  fontWeight: 'bold',
  margin: '10px 0',
  color: '#2c3e50',
};
