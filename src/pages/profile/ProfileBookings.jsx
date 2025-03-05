// src/pages/profile/ProfileBookings.jsx
import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import '../../styles/profile.css'

const Bookings = () => {
  const { user } = useContext(AuthContext)

  // All bookings from localStorage
  const [allBookings, setAllBookings] = useState([])

  // For phone editing
  const [editingId, setEditingId] = useState(null)
  const [editPhone, setEditPhone] = useState('')

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('bookings')) || []
    setAllBookings(data)
  }, [])

  if (!user) return <p>Please login first.</p>

  // Filter this user's bookings
  const userBookings = allBookings.filter((b) => b.userEmail === user.email)

  // Today at midnight
  const now = new Date().setHours(0, 0, 0, 0)

  // Separate upcoming vs. past, sorted so newest are on top
  const upcoming = userBookings
    .filter((b) => new Date(b.startDate).getTime() >= now)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  const past = userBookings
    .filter((b) => new Date(b.startDate).getTime() < now)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  // ---- Handlers ----
  const handleDelete = (bk) => {
    const updated = allBookings.filter((item) => item.createdAt !== bk.createdAt)
    setAllBookings(updated)
    localStorage.setItem('bookings', JSON.stringify(updated))
  }

  const handleCancel = (bk) => {
    // Mark booking as "canceled"
    const updated = allBookings.map((item) => {
      if (item.createdAt === bk.createdAt) {
        return { ...item, status: 'canceled' }
      }
      return item
    })
    setAllBookings(updated)
    localStorage.setItem('bookings', JSON.stringify(updated))
    alert('Booking canceled.')
  }

  const handleEditPhone = (bk) => {
    setEditingId(bk.createdAt)
    setEditPhone(bk.phone)
  }

  const handleSavePhone = (bk) => {
    const updated = allBookings.map((item) => {
      if (item.createdAt === bk.createdAt) {
        return { ...item, phone: editPhone }
      }
      return item
    })
    setAllBookings(updated)
    localStorage.setItem('bookings', JSON.stringify(updated))
    setEditingId(null)
    alert('Phone updated!')
  }

  // Can only cancel if start date is >= 3 days from now
  const canCancel = (bk) => {
    const diff = new Date(bk.startDate).getTime() - now
    const days = diff / (1000 * 3600 * 24)
    return days >= 3
  }

  return (
    <div className="profile-bookings-container">
      <h2>My Bookings</h2>

      {/* UPCOMING BOOKINGS */}
      <div className="booking-section">
        <h4>Upcoming</h4>
        {upcoming.length === 0 ? (
          <p>No upcoming bookings.</p>
        ) : (
          <div className="booking-list upcoming-list">
            {upcoming.map((bk, i) => (
              <BookingCard
                key={i}
                booking={bk}
                editingId={editingId}
                editPhone={editPhone}
                setEditPhone={setEditPhone}
                onEditPhone={handleEditPhone}
                onSavePhone={handleSavePhone}
                onDelete={handleDelete}
                onCancel={handleCancel}
                canCancel={canCancel(bk)}
                isPast={false}
              />
            ))}
          </div>
        )}
      </div>

      {/* PAST BOOKINGS */}
      <div className="booking-section">
        <h4>Past</h4>
        {past.length === 0 ? (
          <p>No past bookings.</p>
        ) : (
          <div className="booking-list">
            {past.map((bk, i) => (
              <BookingCard
                key={i}
                booking={bk}
                editingId={editingId}
                editPhone={editPhone}
                setEditPhone={setEditPhone}
                onEditPhone={handleEditPhone}
                onSavePhone={handleSavePhone}
                onDelete={handleDelete}
                onCancel={handleCancel}
                canCancel={false}
                isPast={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const BookingCard = ({
  booking,
  editingId,
  editPhone,
  setEditPhone,
  onEditPhone,
  onSavePhone,
  onDelete,
  onCancel,
  canCancel,
  isPast
}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const isEditing = editingId === booking.createdAt

  return (
    <div className="booking-item">
      <div className="booking-header">
        <h5>
          {booking.tourName} {booking.status === 'canceled' && '(Canceled)'}
        </h5>
        <span>{new Date(booking.createdAt).toLocaleString()}</span>
      </div>

      <div className="booking-body">
        <p>
          <strong>Full Name:</strong> {booking.fullName}
        </p>

        {isEditing ? (
          <div className="edit-phone">
            <label>Phone:</label>
            <input
              type="text"
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
            />
          </div>
        ) : (
          <p>
            <strong>Phone:</strong> {booking.phone}
          </p>
        )}

        <p>
          <strong>Adults:</strong> {booking.adultCount || booking.guestSize}
        </p>
        <p>
          <strong>Children:</strong> {booking.childCount || 0}
        </p>
        <p>
          <strong>Dates:</strong> {booking.startDate || booking.bookAt}
          {booking.endDate ? ` - ${booking.endDate}` : ''}
        </p>
        <p>
          <strong>Total:</strong> ${booking.totalAmount}
        </p>
      </div>

      <div className="booking-actions">
        <button className="dots-btn" onClick={() => setMenuOpen(!menuOpen)}>
          <i className="ri-more-2-fill"></i>
        </button>
        {menuOpen && (
          <div className="actions-menu">
            {isEditing ? (
              <button onClick={() => onSavePhone(booking)}>Save Phone</button>
            ) : (
              <button onClick={() => onEditPhone(booking)}>Edit Phone</button>
            )}

            {/* Cancel button only if future & not canceled & within cancel window */}
            {canCancel && booking.status !== 'canceled' && !isPast && (
              <button onClick={() => onCancel(booking)}>Cancel</button>
            )}

            {/* Always allow Delete */}
            <button onClick={() => onDelete(booking)}>Cancel/Delete</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Bookings
