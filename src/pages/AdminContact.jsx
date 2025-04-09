import React, { useState, useEffect } from "react";
import "../styles/AdminContactUs.css";
import axios from "axios";

const AdminContactUs = () => {
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [readMessages, setReadMessages] = useState([]);

  // Bileşen yüklendiğinde mesajları çek
  useEffect(() => {
    fetchMessages();
  }, []);

  // Mesajları çekmek için GET istekleri
  const fetchMessages = async () => {
    try {
      const unreadRes = await axios.get("http://localhost:8080/api/contact/unread");
      setUnreadMessages(unreadRes.data);

      const readRes = await axios.get("http://localhost:8080/api/contact/read");
      setReadMessages(readRes.data);
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  };

  // Mesajı "read" yap
  const markAsRead = async (messageId) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/contact/markAsRead/${messageId}`);
      const updatedMessage = response.data;
      // unread listesinden çıkar, read listesine ekle
      setUnreadMessages(prev => prev.filter(msg => msg.messageId !== messageId));
      setReadMessages(prev => [...prev, updatedMessage]);
    } catch (error) {
      console.error("Error marking as read", error);
    }
  };

  // Mesajı "unread" yap
  const markAsUnread = async (messageId) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/contact/markAsUnread/${messageId}`);
      const updatedMessage = response.data;
      // read listesinden çıkar, unread listesine ekle
      setReadMessages(prev => prev.filter(msg => msg.messageId !== messageId));
      setUnreadMessages(prev => [...prev, updatedMessage]);
    } catch (error) {
      console.error("Error marking as unread", error);
    }
  };

  // Mesaj sil
  const deleteMessage = async (messageId, isRead) => {
    try {
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

  // Email ile cevap verme
  const replyToEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="admin-contact-container">
      <h1>Incoming Messages</h1>
      <div className="messages-section">
        
        {/* UNREAD MESSAGES */}
        <div className="unread-messages">
          <h2>📩 Unread Messages</h2>
          {unreadMessages.length > 0 ? (
            unreadMessages.map((msg, index) => (
              <div className="message-card" key={`unread-${msg.messageId}-${index}`}>
                <p><strong>Name:</strong> {msg.name}</p>
                <p><strong>Email:</strong> {msg.email}</p>
                <p><strong>Phone:</strong> {msg.phone}</p>
                <p><strong>Message:</strong> {msg.message}</p>
                <div className="message-actions">
                  <button className="reply-btn" onClick={() => replyToEmail(msg.email)}>
                    Reply
                  </button>
                  <button className="mark-read-btn" onClick={() => markAsRead(msg.messageId)}>
                    Mark as Read
                  </button>
                  <button className="delete-btn" onClick={() => deleteMessage(msg.messageId, false)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>📭 No new messages.</p>
          )}
        </div>

        {/* READ MESSAGES */}
        <div className="read-messages">
          <h2>📂 Read Messages</h2>
          {readMessages.length > 0 ? (
            readMessages.map((msg, index) => (
              <div className="message-card read" key={`read-${msg.messageId}-${index}`}>
                <p><strong>Name:</strong> {msg.name}</p>
                <p><strong>Email:</strong> {msg.email}</p>
                <p><strong>Phone:</strong> {msg.phone}</p>
                <p><strong>Message:</strong> {msg.message}</p>
                <div className="message-actions">
                  <button className="unread-btn" onClick={() => markAsUnread(msg.messageId)}>
                    Mark as Unread
                  </button>
                  <button className="delete-btn" onClick={() => deleteMessage(msg.messageId, true)}>
                    Delete
                  </button>
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
