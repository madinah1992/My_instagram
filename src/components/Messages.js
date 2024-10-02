import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchConversations = async () => {
      const user = 'user123'; // Replace with actual user ID
      const q = query(collection(db, 'conversations'), where('participants', 'array-contains', user));
      const querySnapshot = await getDocs(q);
      const conversationsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setConversations(conversationsArray);
    };

    fetchConversations();
  }, []);

  const handleSendMessage = () => {
    if (selectedConversation && message) {
      // Add your send message logic here
      console.log("Sending message:", message);
      setMessage('');
    }
  };

  return (
    <div className="messages">
      <div className="messages-list">
        <h2>Conversations</h2>
        {conversations.map(conversation => (
          <div key={conversation.id} onClick={() => setSelectedConversation(conversation)}>
            <p>Conversation with {conversation.participants.filter(p => p !== 'user123').join(', ')}</p>
          </div>
        ))}
      </div>
      {selectedConversation && (
        <div className="messages-chat">
          <h2>Chat</h2>
          {/* Render messages here */}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      )}
    </div>
  );
};

export default Messages;
