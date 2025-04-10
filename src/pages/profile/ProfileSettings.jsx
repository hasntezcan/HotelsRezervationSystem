// src/pages/profile/Settings.jsx

import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Settings = () => {
  const { user, dispatch } = useContext(AuthContext);

  // Save userId in localStorage when available
  useEffect(() => {
    if (user?.userId) {
      localStorage.setItem('userId', user.userId.toString());
    }
  }, [user]);

  if (!user) return <p>Please login first.</p>;

  const [formData, setFormData] = useState({
    username: user.username || '',
    email: user.email || '',
    password: user.password || '',
    firstName: user.first_name || user.firstName || '',
    lastName: user.last_name || user.lastName || '',
    phone: user.phone || ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.userId,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Something went wrong");
      }

      const updatedUser = await response.json();

      // Update context and localStorage
      dispatch({ type: "LOGIN_SUCCESS", payload: updatedUser });
      localStorage.setItem("user", JSON.stringify(updatedUser));
      localStorage.setItem("userId", updatedUser.userId.toString());

      alert("Profile updated!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>Settings</h2>
      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Settings;
