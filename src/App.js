// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import Profile from './components/Profile';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import CreatePostForm from './components/CreatePostForm'; // Updated to CreatePostForm
import LiveVideoPage from './components/LiveVideoPage'; // Add this component for live video
import CreateAdPage from './components/CreateAdPage'; // Add this component for ads
import Messages from './components/Messages';
import Notifications from './components/Notifications';
import Settings from './components/Settings';
import Search from './components/Search';
import ReelsPage from './components/ReelsPage';
import Explore from './components/Explore';
import { auth } from './firebase';
import { AuthProvider } from './authContext'; // Import AuthProvider

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <AuthProvider> {/* Wrap the entire app with AuthProvider */}
      <Router>
        <div className="app">
          {user && (
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          )}
          <Routes>
            <Route path="/" element={user ? <HomePage /> : <Navigate to="/signin" />} />
            <Route path="/create-post" element={user ? <CreatePostForm /> : <Navigate to="/signin" />} />
            <Route path="/create-live-video" element={user ? <LiveVideoPage /> : <Navigate to="/signin" />} />
            <Route path="/create-ad" element={user ? <CreateAdPage /> : <Navigate to="/signin" />} />
            <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/signin" />} />
            <Route path="/messages" element={user ? <Messages /> : <Navigate to="/signin" />} />
            <Route path="/notifications" element={user ? <Notifications /> : <Navigate to="/signin" />} />
            <Route path="/settings" element={user ? <Settings /> : <Navigate to="/signin" />} />
            <Route path="/reels" element={user ? <ReelsPage /> : <Navigate to="/signin" />} />
            <Route path="/search" element={user ? <Search /> : <Navigate to="/signin" />} />
            <Route path="/explore" element={user ? <Explore /> : <Navigate to="/signin" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider> 
  );
}

export default App;
