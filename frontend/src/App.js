import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { registerUser, loginUser } from './api';

function App() {
  return (
    <Router>
      <div className="main-wrapper">
        {/* Animated Background Blobs */}
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>

        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

// --- PAGE 1: LOGIN & REGISTER ---
function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      if (isLogin) {
        const response = await loginUser(formData);
        // Assuming success, redirect to Home
        if (response.status === 200) {
            // Save username to show on the next page (optional)
            localStorage.setItem('user', formData.username);
            navigate('/home'); 
        }
      } else {
        const response = await registerUser(formData);
        if (response.status === 200 || response.data.id) {
          setMessage("Registration Successful! Please Login.");
          setIsLogin(true);
        }
      }
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="glass-container">
      <h2>{isLogin ? 'WELCOME BACK' : 'CREATE ACCOUNT'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
            <input 
              type="text" 
              name="username" 
              placeholder="Username" 
              value={formData.username} 
              onChange={handleChange} 
              required 
            />
        </div>
        <div className="input-group">
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
        </div>
        <button type="submit" className="action-btn">{isLogin ? 'LOGIN' : 'SIGN UP'}</button>
      </form>
      {message && <p className="message-text">{message}</p>}
      <p className="toggle-text" onClick={() => { setIsLogin(!isLogin); setMessage(''); }}>
        {isLogin ? "New here? " : "Already have an account? "}
        <span>{isLogin ? 'Create Account' : 'Login'}</span>
      </p>
    </div>
  );
}

// --- PAGE 2: DASHBOARD (AFTER LOGIN) ---
function HomePage() {
  const navigate = useNavigate();
  const user = localStorage.getItem('user') || "User";

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear data
    navigate('/'); // Go back to login
  };

  return (
    <div className="glass-container dashboard-box">
      <h1>Hello, {user}!</h1>
      <p>You have successfully entered the secure area.</p>
      <button onClick={handleLogout} className="logout-btn">LOGOUT</button>
    </div>
  );
}

export default App;