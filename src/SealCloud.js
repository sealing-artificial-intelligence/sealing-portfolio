import React, { useState, useEffect } from 'react';
import './SealCloud.css';
import { Database, Cpu, Cloud } from 'lucide-react';

const SealCloud = ({ isLoggedIn, handleLogout }) => {
  // Store fish styles in state
  const [fishStyles, setFishStyles] = useState([]);

  useEffect(() => {
    const styles = Array.from({ length: 20 }).map(() => {
      const size = Math.random() * 40 + 20; // 20-60px
      const duration = Math.random() * 20 + 10; // 10-30s
      const delay = Math.random() * 30; // 0-30s delay
      const top = Math.random() * 100; // 0-100% vertical position
      const color = `hsl(${Math.random() * 70 + 180}, 70%, 60%)`;
      const swimDirection = Math.random() > 0.5 ? 'normal' : 'reverse';
      const swimStyle = Math.random() > 0.7 ? 'swim-alt' : 'swim';

      // Calculate proper initial position based on direction
      const initialPosition = swimDirection === 'normal'
        ? '-100px'
        : 'calc(100vw + 100px)';

      return {
        '--size': `${size}px`,
        '--duration': `${duration}s`,
        '--delay': `-${delay}s`,
        '--top': `${top}%`,
        '--color': color,
        '--tail-color': color,
        '--opacity': Math.random() * 0.6 + 0.3,
        '--swim-animation': swimStyle,
        '--direction': swimDirection,
        left: initialPosition,
        transform: swimDirection === 'reverse' ? 'rotateY(180deg)' : 'none'
      };
    });

    setFishStyles(styles);
  }, []); // Run only once on mount

  const fishes = fishStyles.map((style, i) => (
    <div
      key={i}
      className="fish"
      style={style}
    />
  ));

  return (
    <div className="seal-cloud-container">
      {/* Fish animation container */}
      <div className="fish-container">
        {fishes}
      </div>

      {/* Header for Seal Cloud page */}
      <header className="seal-cloud-header" style={{ zIndex: 100 }}>
        <nav className="seal-cloud-nav">
          <div className="logo-brand">
            <img
              src={`${process.env.PUBLIC_URL}/sealing.png`}
              alt="Sealing AI Logo"
              className="logo"
            />
            <span className="brand-name">Seal Cloud</span>
          </div>
          <div className="seal-cloud-nav-right">
            {isLoggedIn && (
              <button onClick={handleLogout} className="cta-button secondary">
                Logout
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Main content of the Seal Cloud page */}
      <main className="seal-cloud-main">
        <div className="main-overlay">
          <h1 className="seal-cloud-title">Welcome to Seal Cloud</h1>
          <p className="seal-cloud-subtitle">Your personalized AI workspace.</p>

          {/* Checklist */}
          <div className="seal-cloud-checklist">
            <ul>
              <li><span className="checklist-icon">✔</span> Free 30 day trial</li>
              <li><span className="checklist-icon">✔</span> AI enhanced big data technologies</li>
              <li><span className="checklist-icon">✔</span> Collaborate with your team</li>
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href={isLoggedIn ? "/subscriptions" : "/login"} className="cta-button primary">Subscriptions</a>
            <a href={isLoggedIn ? "/cloud" : "/login"} className="cta-button primary">Get Started</a>
          </div>
        </div>

        {/* Three feature cards */}
        <div className="cards-container" style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <div className="card">
            <div className="card-icon-container">
              <Database size={32} className="card-icon" />
            </div>
            <h3 className="card-title">Big data</h3>
            <p className="card-description">
              Proficient in storing terabytes to terabytes of data.
            </p>
          </div>
          <div className="card">
            <div className="card-icon-container">
              <Cpu size={32} className="card-icon" />
            </div>
            <h3 className="card-title">AI</h3>
            <p className="card-description">
              Using AI to manufacture big data.
            </p>
          </div>
          <div className="card">
            <div className="card-icon-container">
              <Cloud size={32} className="card-icon" />
            </div>
            <h3 className="card-title">Cloud storage</h3>
            <p className="card-description">
              Store and access your data from anywhere.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SealCloud;
