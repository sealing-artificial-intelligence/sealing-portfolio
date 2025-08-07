import React from 'react';
import './SealCloud.css';
import { Database, Cpu, Cloud } from 'lucide-react'; // Importing icons for the cards
import CloudComponent from './Cloud.js'; // Importing CloudComponent from Cloud.js

const SealCloud = ({ isLoggedIn, handleLogout }) => {
  return (
    <div className="seal-cloud-container">
      {/* Header for Seal Cloud page */}
      <header className="seal-cloud-header">
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
        <h1 className="seal-cloud-title">Welcome to Seal Cloud</h1>
        <p className="seal-cloud-subtitle">Your personalized AI workspace.</p>
        
        {/* Replaced description with a checklist */}
        <div className="seal-cloud-checklist">
          <ul>
            <li>
              <span className="checklist-icon">✔</span> Free 30 day trial
            </li>
            <li>
              <span className="checklist-icon">✔</span> AI enhanced big data technologies
            </li>
            <li>
              <span className="checklist-icon">✔</span> Collaborate with your team
            </li>
          </ul>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href={isLoggedIn ? "/subscriptions" : "/auth"} className="cta-button primary">
            Subscriptions
          </a>
          <a href={isLoggedIn ? "/cloud" : "/auth"} className="cta-button primary">
            Get Started
          </a>
        </div>

        {/* Updated section for the three cards with icons and descriptions */}
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
