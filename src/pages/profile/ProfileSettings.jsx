// src/pages/profile/Settings.jsx

import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Settings = () => {
  const { user, dispatch } = useContext(AuthContext)
  if(!user) return <p>Please login first.</p>

  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    password: user.password || ''
  })

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = e => {
    e.preventDefault()

    let localUsers = JSON.parse(localStorage.getItem('localUsers')) || []
    let updatedUsers = localUsers.map(u => {
      if(u.email === user.email) {
        return {
          ...u,
          username: formData.username,
          email: formData.email,
          password: formData.password
        }
      }
      return u
    })

    localStorage.setItem('localUsers', JSON.stringify(updatedUsers))

    // AuthContext user'ı da güncelle
    let newUser = {
      ...user,
      username: formData.username,
      email: formData.email,
      password: formData.password
    }
    dispatch({type: 'LOGIN_SUCCESS', payload: newUser})

    alert('Profile updated!')
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

export default Settings
