// src/components/PostForm.js
import React, { useState } from 'react';
import { storage, db, auth } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Picker from '@emoji-mart/react';
import './PostForm.css';

const PostForm = () => {
  const [text, setText] = useState('');
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState(''); // 'image' or 'video'
  const [loading, setLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State to show/hide emoji picker
  const navigate = useNavigate();

  const handleMediaChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setMedia(file);
      setMediaType(file.type.startsWith('image/') ? 'image' : 'video');
    }
  };

  const handleEmojiSelect = (emoji) => {
    setText(text + emoji.native); // Append the selected emoji to the text
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let mediaUrl = '';
    if (media) {
      const mediaRef = ref(storage, `media/${Date.now()}_${media.name}`);
      await uploadBytes(mediaRef, media);
      mediaUrl = await getDownloadURL(mediaRef);
    }

    await addDoc(collection(db, 'posts'), {
      text,
      mediaUrl,
      mediaType,
      timestamp: new Date(),
      userId: auth.currentUser.uid, // Use auth.currentUser.uid
    });

    setText('');
    setMedia(null);
    setMediaType('');
    setLoading(false);
    navigate('/');
  };

  return (
    <div className="postForm">
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
          required
        />
        {/* Button to toggle the emoji picker */}
        <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          {showEmojiPicker ? 'Hide Emoji' : 'Show Emoji'}
        </button>

        {/* Emoji Picker */}
        {showEmojiPicker && <Picker onSelect={handleEmojiSelect} />}
        
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleMediaChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
