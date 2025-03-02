import "../styles/ManagerContactUs.css";
import React, { useState } from "react";

const ManagerContact = () => {
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
    <div className="contact-page">
      
      {/* Contact Us Form - Left Side */}
      <div className="contact-form-container">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Your Message</label>
          <textarea name="message" value={formData.message} onChange={handleChange} required />

          <button type="submit">Send</button>
        </form>
        {status && <p className="status-message">{status}</p>}
      </div>

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

export default ManagerContact;
