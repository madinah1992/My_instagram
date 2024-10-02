import React from 'react';
import { auth } from '../firebase'; // Firebase auth import
import { useNavigate } from 'react-router-dom'; // Navigation hook

function SignOut() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/signin'); // Redirect to sign-in page after sign-out
    } catch (error) {
      console.error('Sign Out Error', error);
    }
  };

  return (
    <button onClick={handleSignOut} className="signOutButton">
      Sign Out
    </button>
  );
}

export default SignOut;
