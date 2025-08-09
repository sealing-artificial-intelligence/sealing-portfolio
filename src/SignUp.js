import React, { useState } from 'react';
import './Auth.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setIsError(false);
    setLoading(true);

    const payload = { username: email, password };

    try {
      const response = await fetch('https://yearly-notable-newt.ngrok-free.app/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        window.location.href = '/login';
      } else {
        const errorData = await response.json();
        setMessage(errorData.detail || 'Sign up failed. Please try again.');
        setIsError(true);
      }
    } catch {
      setMessage('An error occurred. Please try again later.');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create an Account</h2>
        <p className="auth-subtitle">Get started with Sealing today.</p>

        {message && (
          <div className={`message-box ${isError ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="auth-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="auth-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <a href="/login" className="auth-link">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
