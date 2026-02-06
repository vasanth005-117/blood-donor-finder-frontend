import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Background3D from './components/Background3D';
import DonorRegistration from './components/DonorRegistration';
import DonorSearch from './components/DonorSearch';
import EmergencyRequest from './components/EmergencyRequest';
import DonorProfile from './components/DonorProfile';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="app">
        <Background3D />

        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              🩸 Blood Donor Finder
            </Link>

            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/search" className="nav-link">
                  Find Donors
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/emergency" className="nav-link emergency">
                  Emergency
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin" className="nav-link admin">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<DonorRegistration />} />
          <Route path="/search" element={<DonorSearch />} />
          <Route path="/emergency" element={<EmergencyRequest />} />
          <Route path="/profile" element={<DonorProfile />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Save Lives with Blood Donation</h1>
          <p className="hero-subtitle">
            Connect donors and recipients in times of need
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary">
              🩸 Register as Donor
            </Link>
            <Link to="/search" className="btn btn-secondary">
              🔍 Find Donors
            </Link>
            <Link to="/emergency" className="btn btn-emergency">
              🚨 Emergency Request
            </Link>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2>Why Use Blood Donor Finder?</h2>

        <div className="features-grid">
          <div className="feature-card" style={{ borderColor: '#dc143c' }}>
            <div className="feature-icon">🩸</div>
            <h3>Easy Registration</h3>
            <p>Register as a blood donor in minutes with our simple form</p>
          </div>

          <div className="feature-card" style={{ borderColor: '#87ceeb' }}>
            <div className="feature-icon">🔍</div>
            <h3>Quick Search</h3>
            <p>Find available donors by blood group and location instantly</p>
          </div>

          <div className="feature-card" style={{ borderColor: '#ff6b35' }}>
            <div className="feature-icon">🚨</div>
            <h3>Emergency Support</h3>
            <p>Post urgent blood requests and get notified donors immediately</p>
          </div>

          <div className="feature-card" style={{ borderColor: '#28a745' }}>
            <div className="feature-icon">👤</div>
            <h3>Donor Profile</h3>
            <p>Manage your profile and track your donation history</p>
          </div>

          <div className="feature-card" style={{ borderColor: '#663399' }}>
            <div className="feature-icon">🧑‍⚕️</div>
            <h3>Admin Dashboard</h3>
            <p>Manage donors and emergency requests efficiently</p>
          </div>

          <div className="feature-card" style={{ borderColor: '#ffd700' }}>
            <div className="feature-icon">💎</div>
            <h3>Modern Design</h3>
            <p>Beautiful 3D animated interface with glassmorphism effects</p>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <h2>Making a Difference</h2>
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-value">1000+</span>
            <span className="stat-label">Registered Donors</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">500+</span>
            <span className="stat-label">Lives Saved</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">24/7</span>
            <span className="stat-label">Emergency Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
