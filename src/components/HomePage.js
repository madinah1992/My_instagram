import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import FeedPost from './FeedPost';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import logo from '../img/ins logo.jpg';
import CreateDrawer from './CreateDrawer';
import Stories from './Stories'; // Import Stories component

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerPosition, setDrawerPosition] = useState({ top: '0', left: '0' });
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('Fetched posts:', fetchedPosts); // Debugging line
      setPosts(fetchedPosts);
    });

    return () => unsubscribe();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleCreateClick = (event) => {
    const { top, left, height } = event.target.getBoundingClientRect();
    setDrawerPosition({ top: `${top + height}px`, left: `${left}px` });
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <div className="homepage">
      <div className="homepage__sidebarLeft">
        <img src={logo} alt="Instagram Logo" className="homepage__logo" />
        <ul className="homepage__navList">
          <li onClick={() => handleNavigation('/')}>Home</li>
          <li onClick={() => handleNavigation('/search')}>Search</li>
          <li onClick={() => handleNavigation('/explore')}>Explore</li>
          <li onClick={() => handleNavigation('/reels')}>Reels</li>
          <li onClick={() => handleNavigation('/messages')}>Messages</li>
          <li onClick={() => handleNavigation('/notifications')}>Notifications</li>
          <li onClick={() => handleNavigation('/profile')}>Profile</li>
          <li onClick={() => handleNavigation('/settings')}>Settings</li>
          <li onClick={handleCreateClick}>Create</li>
        </ul>
      </div>
      <div className="feed__container">
      <div className="homepage__feed">
        <Stories /> {/* Add Stories component here */}
        <h2>Feed</h2>
        {posts.length > 0 ? (
          posts.map((post) => (
            <FeedPost key={post.id} post={post} />
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
</div>

      <div className="homepage__sidebarRight">
       
        <div className="suggestions">
          <h4>Suggestions For You</h4>
          <div className="suggestion__user">
            <img src="/path-to-avatar.jpg" alt="User" />
            <p>@suggesteduser1</p>
            <button>Follow</button>
          </div>
          {/* Repeat for more suggestions */}
        </div>
      </div>

      <CreateDrawer 
        isOpen={drawerOpen} 
        onClose={handleCloseDrawer}
        position={drawerPosition}
      />
    </div>
  );
}

export default HomePage;
