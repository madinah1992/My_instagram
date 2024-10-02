import React, { useState } from 'react';
import { db } from '../firebase'; // Make sure this path is correct
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import './PostModal.css'; // Import the CSS for styling

function PostModal({ postId, closeModal }) {
  const [newComment, setNewComment] = useState('');

  // Function to handle adding a comment
  const handleComment = async () => {
    if (newComment.trim()) {
      const postRef = doc(db, 'posts', postId);
      try {
        await updateDoc(postRef, {
          comments: arrayUnion({ username: 'your-username', comment: newComment }), // Replace 'your-username' with actual username
        });
        setNewComment('');
        closeModal(); // Close the modal after adding the comment
      } catch (error) {
        console.error("Error adding comment: ", error);
      }
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Add a Comment</h2>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment here"
        />
        <button onClick={handleComment}>Add Comment</button>
      </div>
    </div>
  );
}

export default PostModal;
