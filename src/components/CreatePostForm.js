// src/components/CreatePostForm.js
import React, { useState } from 'react';
import { db, storage } from '../firebase'; // Ensure Firebase storage is imported
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth'; // Import getAuth
import './CreatePostForm.css';
import { useNavigate } from 'react-router-dom';

const CreatePostForm = ({ onClose }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // State to track uploading
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (content.trim() === '' && !image) {
      alert('Content or image is required');
      return;
    }
    
    setIsUploading(true); // Set uploading state
    let imageUrl = '';

    // Get current user
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const username = currentUser ? currentUser.displayName || currentUser.email : 'Anonymous';

    // If there's an image, upload it to Firebase Storage
    if (image) {
      const storageRef = ref(storage, `posts/${image.name}`); // Create reference for image
      await uploadBytes(storageRef, image); // Upload the image
      imageUrl = await getDownloadURL(storageRef); // Get the image URL after upload
    }

    try {
      // Add post to Firestore with content, imageUrl, and serverTimestamp
      await addDoc(collection(db, 'posts'), {
        content,
        imageUrl, // Store the URL of the uploaded image
        username, // Include the username or email
        timestamp: serverTimestamp(), // Use Firestore server timestamp
      });

      setContent('');
      setImage(null);
      setIsUploading(false);
      navigate('/'); // Navigate to home page or other page after submission
      onClose(); // Close the drawer after submission
    } catch (error) {
      console.error('Error creating post:', error);
      setIsUploading(false); // Stop the loading state if there's an error
    }
  };

  return (
    <div className="create-post-form">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit" disabled={isUploading}>
          {isUploading ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
