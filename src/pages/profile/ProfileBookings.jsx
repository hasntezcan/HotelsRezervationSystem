// src/pages/profile/ProfileBookings.jsx
import React, { useContext, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AuthContext } from '../../context/AuthContext'
import '../../styles/profile.css'
import RoomGallery from '../../shared/RoomGallery/RoomGallery'

const Bookings = () => {
  const { t, i18n } = useTranslation()
  const { user } = useContext(AuthContext)
  const [allBookings, setAllBookings] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editPhone, setEditPhone] = useState('')

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userId = localStorage.getItem('userId')
        const lang = i18n.language
        const response = await fetch(`http://localhost:8080/api/bookings/user/${userId}/details?lang=${lang}`)
        const data = await response.json()
        setAllBookings(data)
      } catch (err) {
        console.error('Failed to fetch bookings:', err)
      }
    }
    fetchBookings()
  }, [i18n.language])

  if (!user) {
    return <p>{t("profile_bookings.login_prompt")}</p>
  }

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
          booking: { ...item.booking, phone: editPhone },
        }
      }
      return item
    })
    setAllBookings(updated)
    setEditingId(null)
    alert(t("profile_bookings.phone_updated"))
  }

  const handleCancel = async (bookingId) => {
    try {
      await fetch(`http://localhost:8080/api/bookings/${bookingId}`, {
        method: 'DELETE',
      })
      setAllBookings((prev) =>
        prev.filter((b) => b.booking.bookingId !== bookingId)
      )
      alert(t("profile_bookings.booking_cancelled"))
    } catch (err) {
      console.error('Cancel failed:', err)
      alert(t("profile_bookings.cancel_failed"))
    }
  }

  const canCancel = (bk) => {
    const diff = new Date(bk.booking.checkInDate).getTime() - now
    const days = diff / (1000 * 3600 * 24)
    return days >= 3
  }

  return (
    <div className="profile-bookings-container">
      <h2 className="bookings-title">{t("profile_bookings.my_bookings")}</h2>

      {/* UPCOMING */}
      <div className="booking-section">
        <h4 className="booking-section-title">{t("profile_bookings.upcoming")}</h4>
        {upcoming.length === 0 ? (
          <p>{t("profile_bookings.no_upcoming")}</p>
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
                onCancel={handleCancel}
                canCancel={canCancel(bk)}
                isPast={false}
              />
            ))}
          </div>
        )}
      </div>

      {/* PAST */}
      <div className="booking-section">
        <h4 className="booking-section-title">{t("profile_bookings.past")}</h4>
        {past.length === 0 ? (
          <p>{t("profile_bookings.no_past")}</p>
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
  data,
  editingId,
  editPhone,
  setEditPhone,
  onEditPhone,
  onSavePhone,
  onCancel,
  canCancel,
  isPast,
}) => {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const isEditing = editingId === data.booking.bookingId

  const {
    booking,
    hotelName,
    city,
    roomName,
    roomType,
    hotelImages,
    hotelAddress,
  } = data

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-GB')

  const formatDateTime = (dateStr) =>
    new Date(dateStr).toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

  return (
    <div className="booking-item card-shadow">
      <div className="booking-body">
        {hotelImages && hotelImages.length > 0 && (
          <div className="booking-gallery">
            <RoomGallery images={hotelImages} />
          </div>
        )}

        <div className="booking-info">
          <h5 className="booking-hotel-name">{hotelName}</h5>
          <p className="booking-room-type">
            {roomType} – {roomName}
          </p>
          <p className="booking-city">
            {city}
            {hotelAddress && (
              <>
                <br />
                <span className="booking-address">{hotelAddress}</span>
              </>
            )}
          </p>

          {booking.status === 'canceled' && (
            <span className="canceled-label">({t("profile_bookings.canceled")})</span>
          )}

          <div className="booking-details-grid">
            <div>
              <strong>{t("profile_bookings.total_guests")}:</strong> {booking.numGuests}
            </div>

            {isEditing ? (
              <div className="booking-edit-phone">
                <label>{t("profile_bookings.phone")}:</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                />
              </div>
            ) : (
              <div>
                <strong>{t("profile_bookings.phone")}:</strong> {booking.phone || '-'}
              </div>
            )}

            <div>
              <strong>{t("profile_bookings.dates")}:</strong> {formatDate(booking.checkInDate)} –{' '}
              {formatDate(booking.checkOutDate)}
            </div>

            <div>
              <strong>{t("profile_bookings.total")}:</strong> ${booking.totalPrice}
            </div>
          </div>
        </div>
      </div>

      <div className="booking-footer">
        <div className="booked-date">
          <strong>{t("profile_bookings.booked_on")}:</strong> {formatDateTime(booking.createdAt)}
        </div>
        <div>
          <button className="dots-btn" onClick={() => setMenuOpen(!menuOpen)}>
            <i className="ri-more-2-fill"></i>
          </button>
          {menuOpen && (
            <div className="actions-menu">
              {isEditing ? (
                <button className="edit-btn" onClick={() => onSavePhone(data)}>
                  {t("profile_bookings.save_phone")}
                </button>
              ) : (
                <button className="edit-btn" onClick={() => onEditPhone(data)}>
                  {t("profile_bookings.edit_phone")}
                </button>
              )}
              {canCancel && booking.status !== 'canceled' && !isPast && (
                <button className="cancel-btn" onClick={() => onCancel(booking.bookingId)}>
                  {t("profile_bookings.cancel")}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Bookings
