import React, { useState } from 'react';
import './Auth.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // This function handles the form submission for signup
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Clear previous messages
    setMessage('');
    setIsError(false);

    // Create the data payload to send to the server.
    // This payload matches the 'User' model expected by your Python back-end.
    const payload = {
      username: email,
      password: password,
    };

    try {
      // Make a POST request to the signup endpoint on your FastAPI server.
      const response = await fetch('https://yearly-notable-newt.ngrok-free.app/signup', {
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
        setIsError(false);
        // You can redirect to the login page or home page after successful signup.
        window.location.href = '/login';
      } else {
        // Handle non-200 responses, such as the 400 Bad Request if the username exists.
        const errorData = await response.json();
        // The error message from your Python back-end is in 'detail'.
        setMessage(errorData.detail || 'Sign up failed. Please try again.');
        setIsError(true);
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
        <h2 className="auth-title">Create an Account</h2>
        <p className="auth-subtitle">Get started with Sealing today.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Display messages to the user */}
          {message && (
            <div className={`message-box ${isError ? 'error' : 'success'}`}>
              {message}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              className="auth-input"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <button type="submit" className="auth-button">Sign Up</button>
        </form>
        <p className="auth-footer">
          Already have an account? <a href="/login" className="auth-link">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
