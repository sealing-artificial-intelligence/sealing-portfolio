import React, { useState, useEffect } from 'react';
import './Cloud.css';
import {
  HardDrive,
  Image,
  FileSearch,
  ArrowRight,
  Cpu,
  Key,
  Database,
  Monitor,
} from 'lucide-react';

const Cloud = () => {
  // Generate fish styles once on mount
  const [fishStyles, setFishStyles] = useState([]);

  useEffect(() => {
    const styles = Array(10)
      .fill(0)
      .map(() => ({
        '--size': `${Math.random() * 0.8 + 0.4}rem`,
        '--speed': `${Math.random() * 10 + 10}s`,
        '--delay': `-${Math.random() * 10}s`,
        '--top': `${Math.random() * 100}%`,
      }));
    setFishStyles(styles);
  }, []);

  // Disk space state and fetching
  const [diskSpace, setDiskSpace] = useState({
    used: 0,
    total: 100,
    percentage: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchDiskSpace = async () => {
      try {
        const username = localStorage.getItem('username') || 'test_user'; // Get username from localStorage or fallback
        const response = await fetch(
          'https://yearly-notable-newt.ngrok-free.app/disk-space',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username }),
          }
        );

        if (!response.ok) throw new Error('Failed to fetch disk space data');

        const data = await response.json();
        const used = data?.used_space_gb ?? 0;
        const total = 100;
        const percentage = (used / total) * 100;

        setDiskSpace({
          used,
          total,
          percentage,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error fetching disk space:', error);
        setDiskSpace((prev) => ({
          ...prev,
          loading: false,
          error: 'Failed to load disk space. Please try again later.',
        }));
      }
    };

    fetchDiskSpace();
  }, []);

  // Logout handler clears stored user data and redirects to login page
  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token'); // remove token if applicable
    window.location.href = '/login';
  };

  return (
    <div className="cloud-dark">
      <div className="fish-container">
        {fishStyles.map((style, index) => (
          <div key={index} className="fish" style={style} />
        ))}
      </div>

      <header className="cloud-header" style={{ alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img
            src={`${process.env.PUBLIC_URL}/sealing.png`}
            alt="Sealing Logo"
            style={{ width: '64px', height: '64px', objectFit: 'contain' }}
          />
          <h1 className="cloud-title" style={{ margin: 0 }}>
            Your Cloud Storage
          </h1>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="cloud-dashboard-summary">
        <section className="disk-space-section">
          <h2 className="disk-space-title">Available disk space</h2>
          {diskSpace.loading ? (
            <p className="disk-space-info">Loading...</p>
          ) : diskSpace.error ? (
            <p className="disk-space-info" style={{ color: 'red' }}>
              {diskSpace.error}
            </p>
          ) : (
            <>
              <p className="disk-space-info">
                {diskSpace.used.toFixed(2)}GB of {diskSpace.total}GB used
              </p>
              <div className="disk-space-progress-bar">
                <div
                  className="disk-space-progress-fill"
                  style={{ width: `${diskSpace.percentage}%` }}
                />
              </div>
            </>
          )}
        </section>

        <section className="storage-cards-container">
          <div className="storage-card vector-storage">
            <Database size={32} />
            <h3 className="storage-card-title">Vector Storage</h3>
            <a href="/vector-storage" className="go-button">
              <span>Go</span>
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="storage-card photo-storage">
            <Image size={32} />
            <h3 className="storage-card-title">Photo Storage</h3>
            <a
              href="https://cloud-front-kappa.vercel.app/"
              className="go-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Go</span>
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="storage-card docs-storage">
            <FileSearch size={32} />
            <h3 className="storage-card-title">Docs Workspace</h3>
            <a
              href="https://docsx-app.vercel.app/"
              className="go-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Go</span>
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="storage-card data-synthesizer">
            <Cpu size={32} />
            <h3 className="storage-card-title">General Purpose Data Synthesizer</h3>
            <a href="/data-synthesizer" className="go-button">
              <span>Go</span>
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="storage-card api-key-card">
            <Key size={32} />
            <h3 className="storage-card-title">Get API Key</h3>
            <a href="/api" className="go-button">
              <span>Go</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Cloud;
