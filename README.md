# Welcome to My Instagram

***

## Task
This project is an Instagram-like web application designed to replicate core functionalities such as user authentication, posting content, commenting, liking, profile management, and more. The goal was to create a fully functional and interactive social media platform using **ReactJS** for the frontend and **Firebase** for the backend and database management.

## Description
The challenge was to create a seamless user experience, allowing users to engage in typical social media activities: creating posts, interacting through likes and comments, managing profiles, and exploring content. The application is scalable, interactive, and responsive.

### Key Features:
- **User Authentication** (sign-up, log-in, and password reset)
- **Profile Management** (edit profile, change avatar, etc.)
- **Post Creation** (images, text, hashtags, etc.)
- **Social Interactions** (likes, comments, sharing, tagging)
- **Notifications** for post interactions
- **Reels, Live Video, and Ad Creation**
- **Search** for users and posts
- **Real-time Updates** using Firebase Firestore
- **Group Creation and Management**
- **Direct Messaging** with real-time chat
- **Explore** trending hashtags, users, and posts

## Features
- **Authentication**: Register, log in, reset passwords.
- **Post Management**: Create, edit, and delete posts supporting images, videos, and text.
- **Social Interactions**: Like, comment, share, tag users, and use hashtags.
- **Explore**: Discover new users, trending posts, hashtags, and groups.
- **Notifications**: Real-time notifications for interactions.
- **Direct Messaging**: Real-time chat with users.
- **Groups**: Create and manage user groups.
- **User Profile**: View and edit profiles, change profile pictures.
- **Media Players**: Custom media players for audio and video content.

## Installation

To run this project locally, follow these steps:

### Clone the repository:
```bash
 follow the deplayed version using this link
''' https://instagram-jti9.vercel.app/

### Install dependencies:
Make sure you have [Node.js](https://nodejs.org/) installed, then run:
```bash
npm install
```

### Run the development server:
```bash
npm start
```
Open your browser and navigate to `http://localhost:3000`.

## Firebase Setup

To use Firebase for authentication and Firestore for real-time updates, follow these steps:

1. **Create a Firebase project**:
   - Go to the [Firebase Console](https://console.firebase.google.com/), create a new project, and set up Firestore and Firebase Authentication.

2. **Create a `.env` file** in the root directory and add your Firebase config:
   ```bash
   REACT_APP_API_KEY=your_api_key
   REACT_APP_AUTH_DOMAIN=your_auth_domain
   REACT_APP_PROJECT_ID=your_project_id
   REACT_APP_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_APP_ID=your_app_id
   ```

3. **Initialize Firebase** in your `firebase.js` file:
   ```javascript
   import { initializeApp } from 'firebase/app';
   import { getFirestore } from 'firebase/firestore';
   import { getAuth } from 'firebase/auth';

   const firebaseConfig = {
     apiKey: process.env.REACT_APP_API_KEY,
     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
     projectId: process.env.REACT_APP_PROJECT_ID,
     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
     appId: process.env.REACT_APP_APP_ID,
   };

   const app = initializeApp(firebaseConfig);
   export const db = getFirestore(app);
   export const auth = getAuth(app);
   ```

4. **Set up Firestore Security Rules** for posts and user data access.

## Usage

Once the application is running, users can sign up or log in to create and interact with posts. Here are the key functionalities:

- **Creating a Post**: Click the "Create" button, choose "Post," upload an image, and add captions or tags.
- **Liking and Commenting**: Browse posts and interact by liking and commenting.
- **Profile Management**: Update profile information and settings.
- **Messaging**: Directly message users via the messaging feature.
- **Notifications**: Get notified of any post interactions, follows, or group activities.

### Example:
```bash
# Run the application
npm start

# Navigate to http://localhost:3000 to see the app in action
```

## Technologies Used
- **Frontend**: ReactJS, CSS, HTML, JavaScript
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Real-time Features**: Firebase Firestore for live updates
- **Deployment**: vercel

## The Core Team
**Abdulkarim Madinah** - OTNI

<span><i>Made at <a href='https://qwasar.io'>Qwasar SV -- Software Engineering School</a></i></span>
<span><img alt='Qwasar SV -- Software Engineering School's Logo' src='https://storage.googleapis.com/qwasar-public/qwasar-logo_50x50.png' width='20px' /></span>

