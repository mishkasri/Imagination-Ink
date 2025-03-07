// src/Menu.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  return (
    <nav className="menu">
      <ul>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/add-story">Add Story</Link></li>
        <li><Link to="/show-stories">Show Stories</Link></li>
        <li><Link to="/chat">Chat</Link></li>
        <li><Link to="/">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Menu;
