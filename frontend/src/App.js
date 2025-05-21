import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchSummary = async () => {
    setLoading(true);
    setError('');
    setSummary('');
    try {
      const res = await axios.post('http://localhost:3001/api/weather-summary', { city });
      setSummary(res.data.summary);
    } catch (err) {
      setError('Error getting summary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '50px auto', padding: 20, fontFamily: 'Arial' }}>
      <h2>AI Weather Summary</h2>
      <input
        type="text"
        value={city}
        placeholder="Enter city"
        onChange={(e) => setCity(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />
      <button onClick={fetchSummary} disabled={!city || loading} style={{ padding: '10px 20px' }}>
        {loading ? 'Loading...' : 'Get Summary'}
      </button>

      {summary && (
        <div style={{ marginTop: 20, padding: 10, background: '#f0f0f0', borderRadius: 5 }}>
          <strong>Summary:</strong> <p>{summary}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
