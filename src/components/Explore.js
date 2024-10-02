// Explore.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch popular posts
      const postsQuery = query(collection(db, 'posts'), orderBy('likesCount', 'desc'), limit(5));
      const postsSnapshot = await getDocs(postsQuery);
      const postsArray = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsArray);

      // Fetch trending hashtags
      // Adjust as needed for your data structure
      const hashtagsQuery = query(collection(db, 'hashtags'), orderBy('popularity', 'desc'), limit(5));
      const hashtagsSnapshot = await getDocs(hashtagsQuery);
      const hashtagsArray = hashtagsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHashtags(hashtagsArray);

      // Fetch suggested users
      const usersQuery = query(collection(db, 'users'), orderBy('followersCount', 'desc'), limit(5));
      const usersSnapshot = await getDocs(usersQuery);
      const usersArray = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersArray);
    };

    fetchData();
  }, []);

  return (
    <div className="explore">
      <div className="explore-section">
        <h2>Popular Posts</h2>
        {posts.map(post => (
          <div key={post.id} className="explore-post">
            <img src={post.imageUrl} alt="Post" className="post-image" />
            <p>{post.caption}</p>
          </div>
        ))}
      </div>

      <div className="explore-section">
        <h2>Trending Hashtags</h2>
        {hashtags.map(hashtag => (
          <div key={hashtag.id} className="explore-hashtag">
            <p>#{hashtag.name}</p>
          </div>
        ))}
      </div>

      <div className="explore-section">
        <h2>Suggested Users</h2>
        {users.map(user => (
          <div key={user.id} className="explore-user">
            <img src={user.profilePic} alt="User Profile" className="user-profile-pic" />
            <p>@{user.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
