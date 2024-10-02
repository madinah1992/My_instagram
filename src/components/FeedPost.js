import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion, deleteDoc } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import Picker from 'emoji-picker-react';
import { getAuth } from 'firebase/auth';
import './FeedPost.css';

function FeedPost({ post, onPostDeleted }) {
  const [likes, setLikes] = useState(post.likes || []);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  const handleLike = async () => {
    if (!currentUser) {
      console.error('No user is currently logged in.');
      return;
    }

    const postRef = doc(db, 'posts', post.id);
    await updateDoc(postRef, {
      likes: arrayUnion(currentUser.email) // Use the current user's email
    });
    setLikes([...likes, currentUser.email]); // Update local state
  };

  const handleComment = async () => {
    if (!currentUser) {
      console.error('No user is currently logged in.');
      return;
    }

    if (newComment.trim()) {
      const postRef = doc(db, 'posts', post.id);
      await updateDoc(postRef, {
        comments: arrayUnion({ username: currentUser.email, comment: newComment }) // Use the current user's email
      });
      setComments([...comments, { username: currentUser.email, comment: newComment }]); // Update local state
      setNewComment(''); // Clear comment input after submission
    }
  };

  const handleDelete = async () => {
    try {
      const postRef = doc(db, 'posts', post.id);
      await deleteDoc(postRef);
      if (onPostDeleted) {
        onPostDeleted(post.id); // Call callback to handle post deletion in parent component
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const onEmojiClick = (emojiObject) => {
    if (emojiObject && emojiObject.emoji) {
      setNewComment(prevComment => prevComment + emojiObject.emoji);
    }
    setShowEmojiPicker(false);
  };

  const formattedTimestamp = post.timestamp
    ? formatDistanceToNow(new Date(post.timestamp.seconds * 1000), { addSuffix: true })
    : '';

  return (
    <div className="feed__post">
      {post.mediaType === 'image' && (
        <img src={post.mediaUrl} alt="" className="post__image" />
      )}
      {post.mediaType === 'video' && (
        <video controls src={post.mediaUrl} className="post__video" />
      )}
      <div className="post__info">
        <h4>@{post.username}</h4> {/* Display post author's username */}
        <p>{post.content}</p>
        {post.imageUrl && (
          <img src={post.imageUrl} alt="" className="post__additional-image" />
        )}
        <p>{post.caption}</p>
        {formattedTimestamp && <p className="post__timestamp">{formattedTimestamp}</p>}
        <div className="post__actions">
          <button onClick={handleLike} className="like-button">Like</button>
          <span>{likes.length} Likes</span>
          <button onClick={handleDelete} className="delete-button">Delete</button>
        </div>
        <div className="post__comments">
          {comments.map((comment, index) => (
            <p key={index}><strong>@{comment.username}</strong> {comment.comment}</p>
          ))}
          <div className="comment__input">
            <input 
              type="text" 
              value={newComment} 
              onChange={(e) => setNewComment(e.target.value)} 
              placeholder="Add a comment..." 
              className="comment-input"
            />
            <button 
              type="button" 
              onClick={() => setShowEmojiPicker(prev => !prev)} 
              aria-label="Toggle emoji picker" 
              className="emoji-picker-button"
            >
              😊
            </button>
            {showEmojiPicker && (
              <Picker
                onEmojiClick={onEmojiClick}
                pickerStyle={{ position: 'absolute', bottom: '60px', right: '20px' }}
              />
            )}
            <button 
              onClick={handleComment} 
              className="comment-button"
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedPost;
