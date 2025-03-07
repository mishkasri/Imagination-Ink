import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="header">
        <div className="logo">IMAGINATION-INK</div>
        <nav className="nav">
          
        </nav>
        <div className="auth-buttons">
          <Link to="/login" className="login-button">Login</Link>
          <Link to="/register" className="register-button">Register</Link>
        </div>
      </header>
      <main className="main-content">
        <h1>Unleash Your Creativity</h1>
        <p>Craft Your Own Adventure</p>
        <div className="buttons">
          <Link to="/login" className="start-button">Start Writing Now</Link>
          <Link to="/learn-more" className="learn-button">Learn More →</Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
