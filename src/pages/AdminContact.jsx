import React, { useState, useEffect } from "react";
import "../styles/AdminContactUs.css"; // Updated CSS for full-page layout

const AdminContactUs = () => {
  const [messages, setMessages] = useState([]);
  const [readMessages, setReadMessages] = useState([]);

  useEffect(() => {
    let storedMessages = JSON.parse(localStorage.getItem("contactMessages"));
    let storedReadMessages = JSON.parse(localStorage.getItem("readMessages"));

    if (!storedMessages || storedMessages.length === 0) {
      storedMessages = [
        { name: "Ahmet Yılmaz", email: "ahmet@example.com", phone: "555-1234", message: "Hello, I would like to get information about the cancellation of my reservation." },
        { name: "Elif Demir", email: "elif@example.com", phone: "532-5678", message: "I would like to stay at your hotel, can I get a price quote?" },
        { name: "Mehmet Kaya", email: "mehmet@example.com", phone: "535-9876", message: "Do you offer conference room rentals in your hotel?" }
      ];
      localStorage.setItem("contactMessages", JSON.stringify(storedMessages));
    }

    if (!storedReadMessages || storedReadMessages.length === 0) {
      storedReadMessages = [
        { name: "Zeynep Çelik", email: "zeynep@example.com", phone: "533-7654", message: "How can I complete my payment?" }
      ];
      localStorage.setItem("readMessages", JSON.stringify(storedReadMessages));
    }

    setMessages(storedMessages);
    setReadMessages(storedReadMessages);
  }, []);

  const markAsRead = (index) => {
    const newReadMessages = [...readMessages, messages[index]];
    const newMessages = messages.filter((_, i) => i !== index);
    setMessages(newMessages);
    setReadMessages(newReadMessages);
    localStorage.setItem("contactMessages", JSON.stringify(newMessages));
    localStorage.setItem("readMessages", JSON.stringify(newReadMessages));
  };

  const deleteMessage = (index, isRead) => {
    if (isRead) {
      const newReadMessages = readMessages.filter((_, i) => i !== index);
      setReadMessages(newReadMessages);
      localStorage.setItem("readMessages", JSON.stringify(newReadMessages));
    } else {
      const newMessages = messages.filter((_, i) => i !== index);
      setMessages(newMessages);
      localStorage.setItem("contactMessages", JSON.stringify(newMessages));
    }
  };

  const markAsUnread = (index) => {
    const newMessages = [...messages, readMessages[index]];
    const newReadMessages = readMessages.filter((_, i) => i !== index);
    setMessages(newMessages);
    setReadMessages(newReadMessages);
    localStorage.setItem("contactMessages", JSON.stringify(newMessages));
    localStorage.setItem("readMessages", JSON.stringify(newReadMessages));
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
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div className="message-card" key={index}>
                <p><strong>Name:</strong> {msg.name}</p>
                <p><strong>Email:</strong> {msg.email}</p>
                <p><strong>Phone:</strong> {msg.phone}</p>
                <p><strong>Message:</strong> {msg.message}</p>
                <div className="message-actions">
                  <button className="reply-btn" onClick={() => replyToEmail(msg.email)}>Reply</button>
                  <button className="mark-read-btn" onClick={() => markAsRead(index)}>Mark as Read</button>
                  <button className="delete-btn" onClick={() => deleteMessage(index, false)}>Delete</button>
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
            readMessages.map((msg, index) => (
              <div className="message-card read" key={index}>
                <p><strong>Name:</strong> {msg.name}</p>
                <p><strong>Email:</strong> {msg.email}</p>
                <p><strong>Phone:</strong> {msg.phone}</p>
                <p><strong>Message:</strong> {msg.message}</p>
                <div className="message-actions">
                  <button className="unread-btn" onClick={() => markAsUnread(index)}>Mark as Unread</button>
                  <button className="delete-btn" onClick={() => deleteMessage(index, true)}>Delete</button>
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
