import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import './Header.css'; // Ensure your CSS styles are linked

function Header() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/signin');
    });
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Instagram Logo</Link>
      </div>
      <div className="auth-buttons">
        {!user ? (
          <>
            <Link to="/signup">
              <button className="auth-btn">Sign Up</button>
            </Link>
            <Link to="/signin">
              <button className="auth-btn">Sign In</button>
            </Link>
          </>
        ) : (
          <button className="auth-btn" onClick={handleSignOut}>Sign Out</button>
        )}
      </div>
    </header>
  );
}

export default Header;
