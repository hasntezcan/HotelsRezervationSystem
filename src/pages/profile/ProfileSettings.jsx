// src/pages/profile/Settings.jsx

import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Settings = () => {
  const { user, dispatch } = useContext(AuthContext);
  if (!user) return <p>Please login first.</p>;

  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    password: user.password || '',
    // Backend'den dönen JSON'da alan isimleri "first_name" ve "last_name" ise:
    firstName: user.first_name || '',
    lastName: user.last_name || '',
    phone: user.phone || ''
  });

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.userId, // Backend için userId gönderimi çok önemli!
          username: formData.username,
          email: formData.email,
          password: formData.password,
          // Backend'in beklediği snake_case alan isimlerini gönderiyoruz:
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
      dispatch({ type: "LOGIN_SUCCESS", payload: updatedUser });
      alert("Profile updated!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Settings</h2>
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
