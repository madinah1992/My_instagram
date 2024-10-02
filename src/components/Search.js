// src/components/Search.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Adjust path as needed
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './Search.css'; // Add your styles

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm.length === 0) return;
      
      const usersRef = collection(db, 'users');
      const groupsRef = collection(db, 'groups'); // Adjust path as needed
      const tagsRef = collection(db, 'tags'); // Adjust path as needed
      
      // Fetch users
      const userQuery = query(usersRef, where('username', '>=', searchTerm), where('username', '<=', searchTerm + '\uf8ff'));
      const userSnap = await getDocs(userQuery);
      const users = userSnap.docs.map(doc => ({ type: 'user', ...doc.data() }));
      
      // Fetch groups
      const groupQuery = query(groupsRef, where('name', '>=', searchTerm), where('name', '<=', searchTerm + '\uf8ff'));
      const groupSnap = await getDocs(groupQuery);
      const groups = groupSnap.docs.map(doc => ({ type: 'group', ...doc.data() }));
      
      // Fetch tags
      const tagQuery = query(tagsRef, where('name', '>=', searchTerm), where('name', '<=', searchTerm + '\uf8ff'));
      const tagSnap = await getDocs(tagQuery);
      const tags = tagSnap.docs.map(doc => ({ type: 'tag', ...doc.data() }));
      
      setResults([...users, ...groups, ...tags]);
    };

    fetchResults();
  }, [searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleResultClick = (result) => {
    if (result.type === 'user') {
      navigate(`/profile/${result.username}`);
    } else if (result.type === 'group') {
      navigate(`/group/${result.name}`);
    } else if (result.type === 'tag') {
      navigate(`/tag/${result.name}`);
    }
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search users, groups, or tags..."
        value={searchTerm}
        onChange={handleChange}
      />
      {results.length > 0 && (
        <div className="search__results">
          {results.map((result, index) => (
            <div
              key={index}
              className="search__result"
              onClick={() => handleResultClick(result)}
            >
              {result.type === 'user' && <p>User: {result.username}</p>}
              {result.type === 'group' && <p>Group: {result.name}</p>}
              {result.type === 'tag' && <p>Tag: {result.name}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
