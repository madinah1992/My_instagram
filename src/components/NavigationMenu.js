// src/components/NavigationMenu.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationMenu.css';

const NavigationMenu = () => {
  return (
    <div className="drawer">
      <nav className="drawer-nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/search">Search</Link></li>
          <li><Link to="/explore">Explore</Link></li>
          <li><Link to="/reels">Reels</Link></li>
          <li><Link to="/messages">Messages</Link></li>
          <li><Link to="/notifications">Notifications</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><Link to="/create-post">Create Post</Link></li> {/* Added Create Post link */}
        </ul>
      </nav>
    </div>
  );
};

export default NavigationMenu;
