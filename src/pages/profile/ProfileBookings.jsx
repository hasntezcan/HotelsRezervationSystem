// src/pages/profile/Bookings.jsx

import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Bookings = () => {
  const { user } = useContext(AuthContext)
  if(!user) return <p>Please login first.</p>

  const allBookings = JSON.parse(localStorage.getItem('bookings')) || []
  const userBookings = allBookings.filter(b => b.userEmail === user.email)

  return (
    <div>
      <h2>My Bookings</h2>
      {userBookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="booking-list">
          {userBookings.map((bk, i) => (
            <div className="booking-item" key={i}>
              <div className="booking-header">
                <h5>{bk.tourName}</h5>
                <span>{new Date(bk.createdAt).toLocaleString()}</span>
              </div>
              <div className="booking-body">
                <p><strong>Full Name:</strong> {bk.fullName}</p>
                <p><strong>Phone:</strong> {bk.phone}</p>
                <p><strong>Guests:</strong> {bk.guestSize}</p>
                <p><strong>Date:</strong> {bk.bookAt}</p>
                <p><strong>Total:</strong> ${bk.totalAmount}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Bookings
