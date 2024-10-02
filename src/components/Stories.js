// src/components/Stories.js
import React from 'react';
import './Stories.css';
import story2 from '../images/story2.jpg';
import story3 from '../images/story3.jpg';

const Stories = () => {
  // Sample data for stories
  const stories = [
    { id: 1, username: 'madinah', imageUrl: story2 },
    { id: 2, username: 'Abdul', imageUrl: story3 },
    { id: 3, username: 'abdullah', imageUrl: '/path-to-story3.jpg' },
  ];

  return (
    <div className="stories">
      <h3>Stories</h3>
      <div className="stories__container">
        {stories.map((story) => (
          <div key={story.id} className="story">
            <img src={story.imageUrl} alt={story.username} className="story__image" />
            <p className="story__username">{story.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
