import React, { useState } from 'react';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // This function handles the form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Clear previous messages
    setMessage('');
    setIsError(false);

    // Create the data payload to send to the server.
    // This matches the 'User' model expected by your Python back-end's @app.post("/login").
    const payload = {
      username: email,
      password: password,
    };

    try {
      // Make a POST request to the login endpoint.
      // This now uses the full URL of your FastAPI server.
      const response = await fetch('https://yearly-notable-newt.ngrok-free.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Check if the response was successful (status code 200).
      // Your Python function returns a 200 on success.
      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setIsError(false); // Set to false on success
        
        // Set the login status in local storage before redirecting
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = '/';
      } else {
        // Handle non-200 responses.
        // Your Python function raises an HTTPException with a 401 status on failure.
        const errorData = await response.json();
        // The error message from your Python back-end is in 'detail'.
        setMessage(errorData.detail || 'Login failed. Please check your credentials.');
        setIsError(true); // Set to true on error
      }
    } catch (error) {
      // Handle network errors or other exceptions
      setMessage('An error occurred. Please try again later.');
      setIsError(true);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Sign in to your account to continue.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Display messages to the user */}
          {message && (
            <div className={`message-box ${isError ? 'error' : 'success'}`}>
              {message}
            </div>
          )}
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
          <button type="submit" className="auth-button">Log In</button>
        </form>
        <p className="auth-footer">
          Don't have an account? <a href="/signup" className="auth-link">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
