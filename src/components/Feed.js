import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Ensure the path is correct
import { collection, onSnapshot } from 'firebase/firestore';
import StoryList from './StoryList'; // Ensure the path is correct
import FeedPost from './FeedPost'; // Ensure the path is correct

const Feed = () => {
    const [stories, setStories] = useState([
        { username: 'john_doe', avatar: '/path-to-avatar1.jpg', seen: false },
        { username: 'jane_smith', avatar: '/path-to-avatar2.jpg', seen: true },
        // More stories...
    ]);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
            const fetchedPosts = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setPosts(fetchedPosts);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <div>
            <StoryList stories={stories} />
            {posts.map((post) => (
                <FeedPost key={post.id} post={post} />
            ))}
        </div>
    );
};

export default Feed;
