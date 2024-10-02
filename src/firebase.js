// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyATM6Y4W6PkB_EEqEpF7arIPtWfSCEO-pQ",
  authDomain: "myinstagram-54382.firebaseapp.com",
  projectId: "myinstagram-54382",
  storageBucket: "myinstagram-54382.appspot.com",
  messagingSenderId: "655160046135",
  appId: "1:655160046135:web:5a96155900dc16bf9ec5b2",
  measurementId: "G-WFM5WP226S"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

export { app, db, auth, storage };
