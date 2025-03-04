// src/pages/profile/Overview.jsx

import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Overview = () => {
  const { user } = useContext(AuthContext)

  // Tüm bookingleri bul
  let bookings = JSON.parse(localStorage.getItem('bookings')) || []
  // Bu kullanıcının bookingleri
  let myBookings = user
    ? bookings.filter(b => b.userEmail === user.email)
    : []

  // Örnek: Son booking
  let lastBookingDate = null
  if(myBookings.length > 0) {
    // en son eklenen booking'in createdAt
    let sorted = myBookings.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
    lastBookingDate = sorted[0].createdAt
  }

  return (
    <div>
      <h2>Overview</h2>
      
      {user ? (
        <>
          <p>Welcome back, <strong>{user.username}</strong>.</p>
          <p>Email: {user.email}</p>
          <hr />

          <div className="stats-box">
            <div className="stat">
              <h4>{myBookings.length}</h4>
              <span>My Bookings</span>
            </div>
            <div className="stat">
              <h4>{lastBookingDate ? new Date(lastBookingDate).toLocaleDateString() : '--'}</h4>
              <span>Last Booking</span>
            </div>
            <div className="stat">
              <h4>--</h4>
              <span>Favorites</span>
            </div>
            {/* Belki favorites eklenir, vs. */}
          </div>
          <hr />
          <p>Explore more tours and plan your next adventure!</p>
        </>
      ) : (
        <p>Please <strong>login</strong> to view your profile overview.</p>
      )}
    </div>
  )
}

export default Overview
