import React from 'react';
import './StoryItem.css'; // For styling each story item

const StoryItem = ({ story }) => {
    return (
        <div className="story-item">
            <img 
                src={story.avatar} 
                alt={story.username} 
                className={`story-avatar ${story.seen ? 'seen' : 'new'}`}
            />
            <p>{story.username}</p>
        </div>
    );
};

export default StoryItem;
