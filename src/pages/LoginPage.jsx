import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

export function LoginPage() {
  const navigate = useNavigate();
  const { user, loginAs } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate inputs
      if (!username.trim()) {
        throw new Error('Username is required');
      }
      if (!password.trim()) {
        throw new Error('Password is required');
      }

      // Attempt login
      await loginAs(username);
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          {/* Logo Section */}
          <div className="login-header">
            <div className="login-logo">
              <div className="logo-icon">📦</div>
            </div>
            <h1 className="login-title">TMS</h1>
            <p className="login-subtitle">Transportation Management System</p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="login-form">
            {/* Username Input */}
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="form-input"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                autoFocus
              />
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials Section */}
          <div className="login-demo-section">
            <p className="demo-title">Demo Credentials</p>
            <div className="demo-credentials">
              <div className="demo-user">
                <strong>Admin</strong>
                <code>admin / admin123</code>
              </div>
              <div className="demo-user">
                <strong>Employee</strong>
                <code>employee / employee123</code>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="login-footer">
            <p className="footer-text">
              © 2026 TMS. All rights reserved.
            </p>
          </div>
        </div>

        {/* Decorative Side Panel */}
        <div className="login-decor">
          <div className="decor-content">
            <h2>Welcome Back</h2>
            <p>Manage your shipments efficiently with TMS</p>
            <ul className="decor-features">
              <li>📊 Real-time tracking</li>
              <li>🔐 Secure access control</li>
              <li>⚡ Fast operations</li>
              <li>📈 Analytics & reports</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
