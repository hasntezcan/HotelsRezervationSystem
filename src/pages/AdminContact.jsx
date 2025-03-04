import "../styles/AdminContactUs.css";
import React, { useState } from "react";

const AdminContact = () => {
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("You must fill in all fields!");
      return;
    }

    setMessages([...messages, formData]); // Add new message to the list
    setFormData({ name: "", email: "", message: "" });
    setStatus("Message sent successfully!");

    setTimeout(() => setStatus(null), 3000); // Remove the message after 3 seconds
  };

  return (
    <div className="contact-container">
      {/* Incoming Messages - Right Side */}
      <div className="messages-container">
        <h2>Incoming Messages</h2>
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="message-card">
              <div className="message-header">
                <strong>{msg.name}</strong>
                <span>{msg.email}</span>
              </div>
              <p className="message-text">{msg.message}</p>
              <a href={`mailto:${msg.email}`} className="reply-btn">
                Answer
              </a>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default AdminContact;
