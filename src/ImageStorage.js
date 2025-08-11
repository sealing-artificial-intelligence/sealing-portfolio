import React, { useState, useEffect } from 'react';
import styles from './VectorStorage.module.css';

const VectorStorage = () => {
  const [fishStyles, setFishStyles] = useState([]);

  useEffect(() => {
    const stylesArray = Array(15)
      .fill(0)
      .map(() => ({
        '--size': `${Math.random() * 1 + 0.8}rem`,    // 0.8rem - 1.8rem
        '--speed': `${Math.random() * 10 + 15}s`,     // 15s - 25s
        '--delay': `-${Math.random() * 20}s`,         // staggered negative delay
        '--top': `${Math.random() * 100}%`,
        '--opacity': Math.random() * 0.3 + 0.4,       // 0.4 - 0.7 opacity
      }));
    setFishStyles(stylesArray);
  }, []);

  const snippet1 = `
#Example: push images
client = SEAL(api_key="YOUR_API_KEY")
client.upload_images(self, zip_file_path: str)
  `;

  const snippet2 = `
#Example: pull images
from sealing import SEAL

client = SEAL(api_key="YOUR_API_KEY")

result_path = client.download_zip(
        file_name: str, 
        save_path: str
    )
  `;

  const handleLogout = () => {
    localStorage.removeItem('username');
    window.location.reload();
  };

  return (
    <div className={styles.vectorStoragePage}>
      {/* Fish background */}
      <div className={styles.fishContainer}>
        {fishStyles.map((style, i) => (
          <div key={i} className={styles.fish} style={style} />
        ))}
      </div>

      {/* Header */}
      <header className={styles.vectorHeader}>
        <div className={styles.headerLeft}>
          <img
            src={`${process.env.PUBLIC_URL}/sealing.png`}
            alt="Sealing"
            className={styles.sealingImage}
          />
          <h1 className={styles.pageTitle}>Sealing</h1>
        </div>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* Main content */}
      <main className={styles.vectorContent}>
        <div className={styles.snippetBox}>
          <h2>Push Images</h2>
          <pre>
            <code>{snippet1}</code>
          </pre>
        </div>
        <div className={styles.snippetBox}>
          <h2>Pull Images</h2>
          <pre>
            <code>{snippet2}</code>
          </pre>
        </div>
      </main>
    </div>
  );
};

export default VectorStorage;
