import React, { useState, useEffect } from 'react';
import './Cloud.css';
import { HardDrive, Image, FileSearch, ArrowRight } from 'lucide-react';

const Cloud = () => {
  // Placeholder data for demonstration purposes
  const files = [];

  // State to manage disk space information
  const [diskSpace, setDiskSpace] = useState({
    used: 0,
    total: 100,
    percentage: 0,
    loading: true,
    error: null,
  });

  // useEffect hook to fetch disk space data on component mount
  useEffect(() => {
    const fetchDiskSpace = async () => {
      try {
        const username = "test_user"; // Using a placeholder username as there's no user context
        const response = await fetch('https://yearly-notable-newt.ngrok-free.app/disk-space', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: username }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch disk space data');
        }

        const data = await response.json();
        
        // Assuming the API returns a number representing used space in GB
        // Added a check to prevent toFixed from being called on an undefined value
        const used = (data && data.used_space_gb) ? data.used_space_gb : 0; 
        const total = 100; // Total space is hardcoded as 100GB in the UI
        const percentage = (used / total) * 100;

        setDiskSpace({
          used,
          total,
          percentage,
          loading: false,
          error: null,
        });

      } catch (error) {
        console.error("Error fetching disk space:", error);
        setDiskSpace(prevState => ({
          ...prevState,
          loading: false,
          error: "Failed to load disk space. Please try again later.",
        }));
      }
    };

    fetchDiskSpace();
  }, []); // The empty array ensures this effect runs only once on mount

  return (
    <div className="cloud-dark">
      <header className="cloud-header">
        <div>
          <h1 className="cloud-title">Your Cloud Storage</h1>
          <p className="cloud-subtitle">Access and manage all your files and folders.</p>
        </div>
        <button className="logout-button">Logout</button>
      </header>

      <div className="cloud-dashboard-summary">
        {/* New section for disk space */}
        <section className="disk-space-section">
          <h2 className="disk-space-title">Available disk space</h2>
          {diskSpace.loading ? (
            <p className="disk-space-info">Loading...</p>
          ) : diskSpace.error ? (
            <p className="disk-space-info" style={{ color: 'red' }}>{diskSpace.error}</p>
          ) : (
            <>
              <p className="disk-space-info">
                {diskSpace.used.toFixed(2)}GB of {diskSpace.total}GB used
              </p>
              <div className="disk-space-progress-bar">
                <div className="disk-space-progress-fill" style={{ width: `${diskSpace.percentage}%` }}></div>
              </div>
            </>
          )}
        </section>

        {/* New section for storage cards */}
        <section className="storage-cards-container">
          <div className="storage-card vector-storage">
            <HardDrive size={32} />
            <h3 className="storage-card-title">Vector Storage</h3>
            <button className="go-button">
              <span>Go</span>
              <ArrowRight size={16} />
            </button>
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
        </section>
      </div>
    </div>
  );
};

export default Cloud;
