// src/pages/profile/ProfileBookings.jsx
import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import '../../styles/profile.css'

const Bookings = () => {
  const { user } = useContext(AuthContext)
  const [allBookings, setAllBookings] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editPhone, setEditPhone] = useState('')

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userId = localStorage.getItem('userId')
        const response = await fetch(`http://localhost:8080/api/bookings/user/${userId}`)
        const data = await response.json()
        setAllBookings(data)
      } catch (err) {
        console.error('Failed to fetch bookings:', err)
      }
    }
    fetchBookings()
  }, [])

  if (!user) return <p>Please login first.</p>

  const now = new Date().setHours(0, 0, 0, 0)

  const upcoming = allBookings
    .filter((b) => new Date(b.checkInDate).getTime() >= now)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  const past = allBookings
    .filter((b) => new Date(b.checkInDate).getTime() < now)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  const handleEditPhone = (bk) => {
    setEditingId(bk.bookingId)
    setEditPhone(bk.phone)
  }

  const handleSavePhone = (bk) => {
    // This part can be extended to update phone in the backend if needed
    const updated = allBookings.map((item) => {
      if (item.bookingId === bk.bookingId) {
        return { ...item, phone: editPhone }
      }
      return item
    })
    setAllBookings(updated)
    setEditingId(null)
    alert('Phone updated!')
  }

  const canCancel = (bk) => {
    const diff = new Date(bk.checkInDate).getTime() - now
    const days = diff / (1000 * 3600 * 24)
    return days >= 3
  }

  return (
    <div className="profile-bookings-container">
      <h2>My Bookings</h2>

      <div className="booking-section">
        <h4>Upcoming</h4>
        {upcoming.length === 0 ? (
          <p>No upcoming bookings.</p>
        ) : (
          <div className="booking-list upcoming-list">
            {upcoming.map((bk) => (
              <BookingCard
                key={bk.bookingId}
                booking={bk}
                editingId={editingId}
                editPhone={editPhone}
                setEditPhone={setEditPhone}
                onEditPhone={handleEditPhone}
                onSavePhone={handleSavePhone}
                canCancel={canCancel(bk)}
                isPast={false}
              />
            ))}
          </div>
        )}
      </div>

      <div className="booking-section">
        <h4>Past</h4>
        {past.length === 0 ? (
          <p>No past bookings.</p>
        ) : (
          <div className="booking-list">
            {past.map((bk) => (
              <BookingCard
                key={bk.bookingId}
                booking={bk}
                editingId={editingId}
                editPhone={editPhone}
                setEditPhone={setEditPhone}
                onEditPhone={handleEditPhone}
                onSavePhone={handleSavePhone}
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
  canCancel,
  isPast
}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const isEditing = editingId === booking.bookingId

  return (
    <div className="booking-item">
      <div className="booking-header">
        <h5>
          Room ID: {booking.roomId} {booking.status === 'canceled' && '(Canceled)'}
        </h5>
        <span>{new Date(booking.createdAt).toLocaleString()}</span>
      </div>

      <div className="booking-body">
        <p>
          <strong>Total Guests:</strong> {booking.numGuests}
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
            <strong>Phone:</strong> {booking.phone || '-'}
          </p>
        )}

        <p>
          <strong>Dates:</strong> {booking.checkInDate} - {booking.checkOutDate}
        </p>
        <p>
          <strong>Total:</strong> ${booking.totalPrice}
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

            {canCancel && booking.status !== 'canceled' && !isPast && (
              <button onClick={() => alert('Cancel feature coming soon.')}>Cancel</button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Bookings
