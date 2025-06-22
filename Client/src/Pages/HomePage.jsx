import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    navigate('/create-room');
  };

  const handleJoinRoom = () => {
    navigate('/join-room');
  };

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', padding: '2rem', color: '#fff', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>🧠 CodeSphere</h1>
        <button
          onClick={() => navigate('/profile')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#1d4ed8',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            color: 'white'
          }}
        >
          Profile
        </button>
      </header>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {/* Create Room Card */}
        <div style={cardStyle}>
          <h2 style={cardTitle}>Create Room</h2>
          <p>Create a new collaborative code room</p>
          <button style={blueBtn} onClick={handleCreateRoom}>Create</button>
        </div>

        {/* Join Room Card */}
        <div style={cardStyle}>
          <h2 style={cardTitle}>Join Room</h2>
          <p>Enter an existing room ID to join</p>
          <button style={greenBtn} onClick={handleJoinRoom}>Join</button>
        </div>

        {/* Saved Projects */}
        <div style={cardStyle}>
          <h2 style={cardTitle}>Your Projects</h2>
          <ul style={{ marginTop: '10px' }}>
            <li style={projectItem}>Portfolio Builder</li>
            <li style={projectItem}>React + Node Starter</li>
            <li style={projectItem}>Next.js Boilerplate</li>
          </ul>
        </div>

        {/* Leaderboard Preview */}
        <div style={cardStyle}>
          <h2 style={cardTitle}>🏆 Top Coders (District)</h2>
          <ol style={{ marginTop: '10px', paddingLeft: '1.2rem' }}>
            <li>👑 Krish - Govt. Engineering College</li>
            <li>⭐ Meena - IIIT Kota</li>
            <li>⭐ Aman - JECRC</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

const cardStyle = {
  backgroundColor: '#1e293b',
  borderRadius: '12px',
  padding: '1.5rem',
  boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
};

const cardTitle = {
  fontSize: '1.25rem',
  marginBottom: '0.5rem',
  fontWeight: '600'
};

const blueBtn = {
  marginTop: '1rem',
  padding: '0.5rem 1rem',
  backgroundColor: '#2563eb',
  border: 'none',
  borderRadius: '6px',
  color: 'white',
  cursor: 'pointer'
};

const greenBtn = {
  marginTop: '1rem',
  padding: '0.5rem 1rem',
  backgroundColor: '#16a34a',
  border: 'none',
  borderRadius: '6px',
  color: 'white',
  cursor: 'pointer'
};

const projectItem = {
  marginBottom: '0.4rem',
  padding: '0.3rem 0.6rem',
  backgroundColor: '#334155',
  borderRadius: '6px'
};

export default HomePage;
