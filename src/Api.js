import React, { useState, useEffect, useMemo } from 'react';
import './Api.css';

const Api = () => {
  const username = localStorage.getItem('username') || '';

  // keys is now array of objects: { key: string, createdAt: string }
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generating, setGenerating] = useState(false);
  const [copiedKeyIndex, setCopiedKeyIndex] = useState(null);

  // Generate fishes once on mount - all swim right now
  const fishes = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => {
      const size = Math.random() * 12 + 8;
      const speed = Math.random() * 10 + 15;
      const delay = Math.random() * -20;
      const top = Math.random() * 100;
      const opacity = Math.random() * 0.3 + 0.4;

      return {
        id: i,
        size,
        speed,
        delay,
        top,
        opacity,
      };
    });
  }, []);

  useEffect(() => {
    if (!username) return;
    setLoading(true);
    setError('');
    fetch('https://yearly-notable-newt.ngrok-free.app/get-all-keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch keys');
        return res.json();
      })
      .then((data) => {
        // Make sure keys are objects with key & createdAt
        // If backend returns array of strings, map to objects with dummy dates for now
        const keysWithDates = (data.keys || []).map((item) =>
          typeof item === 'string' ? { key: item, createdAt: new Date().toISOString() } : item
        );
        setKeys(keysWithDates);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load API keys');
        setLoading(false);
      });
  }, [username]);

  const generateKey = async () => {
    if (!username) {
      setError('Username not found, please login');
      return;
    }
    setGenerating(true);
    setError('');
    try {
      const res = await fetch('https://yearly-notable-newt.ngrok-free.app/generate-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });
      if (!res.ok) throw new Error('Failed to generate key');
      const data = await res.json();
      // Append new key with current date
      setKeys((prev) => [...prev, { key: data.apiKey, createdAt: new Date().toISOString() }]);
    } catch {
      setError('Failed to generate API key');
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = (key, index) => {
    navigator.clipboard.writeText(key);
    setCopiedKeyIndex(index);
    setTimeout(() => setCopiedKeyIndex(null), 2000);
  };

  const fishElements = fishes.map((fish) => {
    const style = {
      '--size': `${fish.size}px`,
      '--speed': `${fish.speed}s`,
      '--delay': `${fish.delay}s`,
      '--top': `${fish.top}%`,
      '--opacity': fish.opacity,
      animationName: 'swim-right',
      transform: 'rotateY(0deg)',
      left: 0,
      right: 'auto',
    };
    return <div key={fish.id} className="fish" style={style} />;
  });

  const maskKey = (key) => (key ? '•'.repeat(key.length) : '');

  // Format date nicely
  const formatDate = (isoString) => {
    try {
        const date = new Date(isoString);
        return (
        date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }) +
        ' ' +
        date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        })
        );
    } catch {
        return '';
    }
    };


  return (
    <>
      <div className="fish-container">{fishElements}</div>
      <div className="api-container">
        <h1>API Key Management</h1>
        {!username && <p>Please log in to manage your API keys.</p>}

        {error && <p className="error-message">{error}</p>}

        {loading ? (
          <p>Loading keys...</p>
        ) : (
          <>
            <div className="keys-list">
              <ul>
                {keys.length === 0 && <li>No API keys found.</li>}
                {keys.map(({ key, createdAt }, idx) => (
                  <li
                    key={idx}
                    className="key-item"
                    title="Click to copy"
                    onClick={() => handleCopy(key, idx)}
                    style={{ cursor: 'pointer', userSelect: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <span>{maskKey(key)}</span>
                    <span style={{ fontSize: '0.85em', color: '#666', marginLeft: '1rem', whiteSpace: 'nowrap' }}>
                      {formatDate(createdAt)}
                    </span>
                    {copiedKeyIndex === idx && (
                      <span
                        className="copied-feedback"
                        style={{ marginLeft: '1rem', color: 'green', fontWeight: 'bold' }}
                      >
                        Copied!
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="buttons">
              <button onClick={generateKey} disabled={generating || !username}>
                {generating ? 'Generating...' : 'Generate New API Key'}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Api;
