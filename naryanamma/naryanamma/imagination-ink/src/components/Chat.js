// src/Chat.js
import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSelectingUser, setIsSelectingUser] = useState(false);

  useEffect(() => {
    fetchMessages();
    fetchUsers();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:3003/messages');
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Error fetching messages');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3003/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedUser) {
      try {
        const response = await fetch('http://localhost:3003/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ recipient: selectedUser, message: newMessage }),
        });
        if (response.ok) {
          fetchMessages();
          setNewMessage('');
        } else {
          setError('Error sending message');
        }
      } catch (error) {
        console.error('Error sending message:', error);
        setError('Error sending message');
      }
    }
  };

  const handleNewChat = () => {
    setIsSelectingUser(true);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setIsSelectingUser(false);
  };

  return (
    <div className="chat-page">
      <Menu />
      <div className="chat-container">
        <h1>Chat</h1>
        <button className="new-chat-button" onClick={handleNewChat}>✏️ New Chat</button>
        {isSelectingUser ? (
          <div className="user-select">
            <h2>Select User</h2>
            {users.map((user) => (
              <button key={user._id} onClick={() => handleUserSelect(user.username)}>
                {user.username}
              </button>
            ))}
          </div>
        ) : (
          <div>
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div key={index} className="message-tile">
                  <p><strong>{msg.sender}</strong>: {msg.message}</p>
                </div>
              ))
            ) : (
              <p>No messages</p>
            )}
          </div>
        )}
        <div className="send-message">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Chat;
