import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import FeedPost from './FeedPost';
import './Profile.css';

function Profile() {
  const [userPosts, setUserPosts] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newBio, setNewBio] = useState('');
  const [newProfilePictureUrl, setNewProfilePictureUrl] = useState('');

  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser) return;

    const fetchUserProfile = async () => {
      const userProfileRef = doc(db, 'users', currentUser.uid);
      const userProfileSnap = await getDoc(userProfileRef);
      if (userProfileSnap.exists()) {
        setUserProfile(userProfileSnap.data());
        setNewUsername(userProfileSnap.data().username || '');
        setNewBio(userProfileSnap.data().bio || '');
        setNewProfilePictureUrl(userProfileSnap.data().profilePictureUrl || '');
      }
    };

    const fetchUserPosts = async () => {
      const q = query(collection(db, 'posts'), where('userId', '==', currentUser.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserPosts(fetchedPosts);
      });
      return () => unsubscribe();
    };

    fetchUserProfile();
    fetchUserPosts();
  }, [currentUser]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    const userProfileRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userProfileRef, {
      username: newUsername,
      bio: newBio,
      profilePictureUrl: newProfilePictureUrl
    });
    setUserProfile({
      ...userProfile,
      username: newUsername,
      bio: newBio,
      profilePictureUrl: newProfilePictureUrl
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  if (!currentUser) {
    return <p>Please sign in to view your profile.</p>;
  }

  return (
    <div className="profile">
      <div className="profile__header">
        <img 
          src={userProfile?.profilePictureUrl || '/default-avatar.png'} 
          alt="Username" 
          className="profile__avatar" 
        />
        {editing ? (
          <div>
            <label>
              Username:
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </label>
            <label>
              Bio:
              <input
                type="text"
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
              />
            </label>
            <label>
              Profile Picture URL:
              <input
                type="text"
                value={newProfilePictureUrl}
                onChange={(e) => setNewProfilePictureUrl(e.target.value)}
              />
            </label>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <div>
            <h2>@{userProfile?.username}</h2>
            <p>{userProfile?.bio || 'No bio available'}</p>
            <button onClick={handleEdit}>Edit Profile</button>
          </div>
        )}
      </div>

      <div className="profile__posts">
        <h3>Your Posts</h3>
        <div className="profile__postGrid">
          {userPosts.map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
