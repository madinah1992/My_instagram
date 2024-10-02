// src/authContext.js
import React, { useContext, useState, useEffect, createContext } from 'react';
import { auth } from './firebase'; // Make sure the Firebase Auth is correctly set up

// Create a context for Auth
const AuthContext = createContext();

// Export a hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider component to wrap around the app
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Firebase auth state listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false); // Ensure we stop loading once we get the user
    });

    // Cleanup the listener
    return unsubscribe;
  }, []);

  const value = {
    currentUser, // This is the logged-in user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
