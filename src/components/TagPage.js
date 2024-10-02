// src/components/TagPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

const TagPage = () => {
  const { tagName } = useParams();

  return (
    <div className="tagPage">
      <h2>Posts tagged with #{tagName}</h2>
      {/* Add logic to fetch and display posts with the specified tag */}
    </div>
  );
};

export default TagPage;
