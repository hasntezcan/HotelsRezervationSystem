import React, { useState, useEffect } from "react";
import "../styles/AdminContactUs.css";
import axios from "axios";

const AdminContactUs = () => {
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [readMessages, setReadMessages] = useState([]);

  // Fetch messages from the database on component mount
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      // GET unread messages endpoint
      const unreadResponse = await axios.get("http://localhost:8080/api/contact/unread");
      setUnreadMessages(unreadResponse.data);

      // GET read messages endpoint
      const readResponse = await axios.get("http://localhost:8080/api/contact/read");
      setReadMessages(readResponse.data);
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  };

  const markAsRead = async (messageId) => {
    try {
      // PUT endpoint to mark message as read
      const response = await axios.put(`http://localhost:8080/api/contact/markAsRead/${messageId}`);
      // Update the state: remove from unread and add to read
      const updatedMessage = response.data;
      setUnreadMessages(prev => prev.filter(msg => msg.messageId !== messageId));
      setReadMessages(prev => [...prev, updatedMessage]);
    } catch (error) {
      console.error("Error marking as read", error);
    }
  };

  const markAsUnread = async (messageId) => {
    try {
      // PUT endpoint to mark message as unread
      const response = await axios.put(`http://localhost:8080/api/contact/markAsUnread/${messageId}`);
      const updatedMessage = response.data;
      setReadMessages(prev => prev.filter(msg => msg.messageId !== messageId));
      setUnreadMessages(prev => [...prev, updatedMessage]);
    } catch (error) {
      console.error("Error marking as unread", error);
    }
  };

  const deleteMessage = async (messageId, isRead) => {
    try {
      // DELETE endpoint to remove the message
      await axios.delete(`http://localhost:8080/api/contact/${messageId}`);
      if (isRead) {
        setReadMessages(prev => prev.filter(msg => msg.messageId !== messageId));
      } else {
        setUnreadMessages(prev => prev.filter(msg => msg.messageId !== messageId));
      }
    } catch (error) {
      console.error("Error deleting message", error);
    }
  };

  const replyToEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="admin-contact-container">
      <h1>Incoming Messages</h1>
      <div className="messages-section">
        <div className="unread-messages">
          <h2>📩 Unread Messages</h2>
          {unreadMessages.length > 0 ? (
            unreadMessages.map((msg) => (
              <div className="message-card" key={msg.messageId}>
                <p><strong>Name:</strong> {msg.senderName}</p>
                <p><strong>Email:</strong> {msg.senderEmail}</p>
                <p><strong>Phone:</strong> {msg.phone}</p>
                <p><strong>Message:</strong> {msg.message}</p>
                <div className="message-actions">
                  <button className="reply-btn" onClick={() => replyToEmail(msg.senderEmail)}>Reply</button>
                  <button className="mark-read-btn" onClick={() => markAsRead(msg.messageId)}>Mark as Read</button>
                  <button className="delete-btn" onClick={() => deleteMessage(msg.messageId, false)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p>📭 No new messages.</p>
          )}
        </div>

        <div className="read-messages">
          <h2>📂 Read Messages</h2>
          {readMessages.length > 0 ? (
            readMessages.map((msg) => (
              <div className="message-card read" key={msg.messageId}>
                <p><strong>Name:</strong> {msg.senderName}</p>
                <p><strong>Email:</strong> {msg.senderEmail}</p>
                <p><strong>Phone:</strong> {msg.phone}</p>
                <p><strong>Message:</strong> {msg.message}</p>
                <div className="message-actions">
                  <button className="unread-btn" onClick={() => markAsUnread(msg.messageId)}>Mark as Unread</button>
                  <button className="delete-btn" onClick={() => deleteMessage(msg.messageId, true)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p>📂 No read messages.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminContactUs;
