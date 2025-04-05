// src/pages/profile/Settings.jsx

import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Settings = () => {
  const { user, dispatch } = useContext(AuthContext)
  if (!user) return <p>Please login first.</p>

  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    password: user.password || ''
  })

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:8080/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.userId, // AuthContext'teki kullanıcı nesnesinde userId'nin olduğundan emin olun
          username: formData.username,
          email: formData.email,
          password: formData.password
          // Eğer firstName, lastName veya phone gibi alanlarınız varsa onları da ekleyebilirsiniz.
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Something went wrong");
      }

      const updatedUser = await response.json();
      // AuthContext'i güncelliyoruz
      dispatch({ type: 'LOGIN_SUCCESS', payload: updatedUser });
      alert('Profile updated!');
    } catch (err) {
      alert(err.message);
    }
  }

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

        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default Settings;
