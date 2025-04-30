import React, { useState, useEffect } from "react";
import "../styles/AdminContactUs.css";
import axios from "axios";
import { useTranslation } from "react-i18next";

const AdminContactUs = () => {
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [readMessages, setReadMessages] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetchMessages();
  }, []);

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

  const markAsRead = async (messageId) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/contact/markAsRead/${messageId}`);
      const updatedMessage = response.data;
      setUnreadMessages(prev => prev.filter(msg => msg.messageId !== messageId));
      setReadMessages(prev => [...prev, updatedMessage]);
    } catch (error) {
      console.error("Error marking as read", error);
    }
  };

  const markAsUnread = async (messageId) => {
    try {
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
      <h1>{t("admin_contact.title")}</h1>
      <div className="messages-section">

        {/* UNREAD MESSAGES */}
        <div className="unread-messages">
          <h2>📩 {t("admin_contact.unread_title")}</h2>
          {unreadMessages.length > 0 ? (
            unreadMessages.map((msg, index) => (
              <div className="message-card" key={`unread-${msg.messageId}-${index}`}>
                <p><strong>{t("admin_contact.name")}:</strong> {msg.name}</p>
                <p><strong>{t("admin_contact.email")}:</strong> {msg.email}</p>
                <p><strong>{t("admin_contact.phone")}:</strong> {msg.phone}</p>
                <p><strong>{t("admin_contact.message")}:</strong> {msg.message}</p>
                <div className="message-actions">
                  <button className="reply-btn" onClick={() => replyToEmail(msg.email)}>
                    {t("admin_contact.reply")}
                  </button>
                  <button className="mark-read-btn" onClick={() => markAsRead(msg.messageId)}>
                    {t("admin_contact.mark_read")}
                  </button>
                  <button className="delete-btn" onClick={() => deleteMessage(msg.messageId, false)}>
                    {t("admin_contact.delete")}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>📭 {t("admin_contact.no_unread")}</p>
          )}
        </div>

        {/* READ MESSAGES */}
        <div className="read-messages">
          <h2>📂 {t("admin_contact.read_title")}</h2>
          {readMessages.length > 0 ? (
            readMessages.map((msg, index) => (
              <div className="message-card read" key={`read-${msg.messageId}-${index}`}>
                <p><strong>{t("admin_contact.name")}:</strong> {msg.name}</p>
                <p><strong>{t("admin_contact.email")}:</strong> {msg.email}</p>
                <p><strong>{t("admin_contact.phone")}:</strong> {msg.phone}</p>
                <p><strong>{t("admin_contact.message")}:</strong> {msg.message}</p>
                <div className="message-actions">
                  <button className="unread-btn" onClick={() => markAsUnread(msg.messageId)}>
                    {t("admin_contact.mark_unread")}
                  </button>
                  <button className="delete-btn" onClick={() => deleteMessage(msg.messageId, true)}>
                    {t("admin_contact.delete")}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>📂 {t("admin_contact.no_read")}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminContactUs;
