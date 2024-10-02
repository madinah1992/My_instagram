import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import PostModal from './PostModal';
import './Post.css'; // Optional CSS for styling

function Post({ postId, username, caption, imageUrl, likes, comments }) {
  const [liked, setLiked] = useState(likes.includes('your-username')); // Replace with actual username
  const [modalShow, setModalShow] = useState(false);

  const handleLike = async () => {
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      likes: arrayUnion('your-username'), // Replace with the actual username
    });
    setLiked(true);
  };

  return (
    <div className="post">
      <img
        src={imageUrl}
        alt="Post"
        className="post__image"
        onClick={() => setModalShow(true)}
      />
      <div className="post__info">
        <h4>@{username}</h4>
        <p>{caption}</p>
        <div className="post__actions">
          <button onClick={handleLike}>{liked ? 'Liked' : 'Like'}</button>
        </div>
      </div>
      <PostModal
        postId={postId}
        show={modalShow}
        handleClose={() => setModalShow(false)}
        post={{ username, caption, imageUrl, comments }}
      />
    </div>
  );
}

export default Post;
