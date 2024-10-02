// src/components/CreateDrawer.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './CreateDrawer.css';

const CreateDrawer = ({ isOpen, onClose, position }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  if (!isOpen) return null;

  // Handle navigation for each option
  const handleCreatePost = () => {
    navigate('/create-post'); // Navigate to the Create Post page
    onClose(); // Close the drawer after navigation
  };

  const handleCreateLiveVideo = () => {
    navigate('/create-live-video'); // Navigate to the Create Live Video page
    onClose(); // Close the drawer after navigation
  };

  const handleCreateAd = () => {
    navigate('/create-ad'); // Navigate to the Create Ad page
    onClose(); // Close the drawer after navigation
  };

  return (
    <div className="create-drawer" style={{ top: position.top, left: position.left }}>
      <div className="create-drawer__content">
        <button className="create-drawer__close" onClick={onClose}>X</button>
        <h3>Create</h3>
        <div className="create-drawer__options">
          <button className="create-drawer__option" onClick={handleCreatePost}>
            Post
          </button>
          <button className="create-drawer__option" onClick={handleCreateLiveVideo}>
            Live Video
          </button>
          <button className="create-drawer__option" onClick={handleCreateAd}>
            Ad
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDrawer;
