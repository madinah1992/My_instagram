import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Create or update a user profile in Firestore.
 * @param {string} userId - The ID of the user.
 * @param {Object} profileData - The data to be set for the user's profile.
 */
export const createUserProfile = async (userId, profileData) => {
  const userRef = doc(db, 'users', userId);
  
  try {
    await setDoc(userRef, profileData, { merge: true });
    console.log('User profile created/updated successfully');
  } catch (error) {
    console.error('Error creating/updating profile:', error);
  }
};
