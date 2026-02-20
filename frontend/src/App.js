import React from 'react';
export default function App() {
  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>🔧 B2B Repair Portal</h1>
      <p>Backend URL: {process.env.REACT_APP_API_URL}</p>
      <p>Your app is deployed!</p>
    </div>
  );
}
