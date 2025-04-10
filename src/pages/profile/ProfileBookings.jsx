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
        const response = await fetch(`http://localhost:8080/api/bookings/user/${userId}/details`)
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
    .filter((b) => new Date(b.booking.checkInDate).getTime() >= now)
    .sort((a, b) => new Date(b.booking.createdAt) - new Date(a.booking.createdAt))

  const past = allBookings
    .filter((b) => new Date(b.booking.checkInDate).getTime() < now)
    .sort((a, b) => new Date(b.booking.createdAt) - new Date(a.booking.createdAt))

  const handleEditPhone = (bk) => {
    setEditingId(bk.booking.bookingId)
    setEditPhone(bk.booking.phone)
  }

  const handleSavePhone = (bk) => {
    const updated = allBookings.map((item) => {
      if (item.booking.bookingId === bk.booking.bookingId) {
        return {
          ...item,
          booking: { ...item.booking, phone: editPhone }
        }
      }
      return item
    })
    setAllBookings(updated)
    setEditingId(null)
    alert('Phone updated!')
  }

  const canCancel = (bk) => {
    const diff = new Date(bk.booking.checkInDate).getTime() - now
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
            {upcoming.map((bk, index) => (
              <BookingCard
                key={index}
                data={bk}
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
            {past.map((bk, index) => (
              <BookingCard
                key={index}
                data={bk}
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
  data,
  editingId,
  editPhone,
  setEditPhone,
  onEditPhone,
  onSavePhone,
  canCancel,
  isPast
}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { booking, hotelName, roomName, city, roomType } = data
  const isEditing = editingId === booking.bookingId

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-GB')

  const formatDateTime = (dateStr) =>
    new Date(dateStr).toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

  return (
    <div className="booking-item">
      <div className="booking-header">
        <h5>
          {hotelName} – {roomName} ({roomType}) in {city}{' '}
          {booking.status === 'canceled' && '(Canceled)'}
        </h5>
      </div>

      <div className="booking-body">
        <p><strong>Total Guests:</strong> {booking.numGuests}</p>

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
          <p><strong>Phone:</strong> {booking.phone || '-'}</p>
        )}

        <p><strong>Dates:</strong> {formatDate(booking.checkInDate)} – {formatDate(booking.checkOutDate)}</p>

        <p><strong>Total:</strong> ${booking.totalPrice}</p>

        <div className="booking-footer">
          <p className="booked-date"><strong>Booked on:</strong> {formatDateTime(booking.createdAt)}</p>
        </div>
      </div>

      <div className="booking-actions">
        <button className="dots-btn" onClick={() => setMenuOpen(!menuOpen)}>
          <i className="ri-more-2-fill"></i>
        </button>
        {menuOpen && (
          <div className="actions-menu">
            {isEditing ? (
              <button onClick={() => onSavePhone(data)}>Save Phone</button>
            ) : (
              <button onClick={() => onEditPhone(data)}>Edit Phone</button>
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
