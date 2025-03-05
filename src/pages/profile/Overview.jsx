// src/pages/profile/Overview.jsx
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import hotelsData from '../../assets/data/hotels'
import '../../styles/profile.css'

const Overview = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  // Load all bookings from localStorage
  const bookings = JSON.parse(localStorage.getItem('bookings')) || []

  // Filter bookings belonging to the current user
  const myBookings = user ? bookings.filter((b) => b.userEmail === user.email) : []

  // Determine the date of the last booking
  // Here we use the booking's `createdAt` to indicate when the user last booked.
  // If you prefer the trip's start date, use `startDate` instead.
  let lastBookingDate = null
  if (myBookings.length > 0) {
    const sorted = [...myBookings].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
    lastBookingDate = sorted[0].createdAt // or .startDate if you prefer
  }

  // Randomly pick 3 featured hotels for the user
  const featuredHotels = hotelsData.filter((h) => h.featured)
  const shuffleArray = [...featuredHotels].sort(() => 0.5 - Math.random())
  const randomThree = shuffleArray.slice(0, 3)

  return (
    <div>
      <h2>Overview</h2>

      {user ? (
        <>
          <p>
            Welcome back, <strong>{user.username}</strong>.
          </p>
          <p>Email: {user.email}</p>
          <hr />

          {/* Stats Box */}
          <div className="stats-box">
            <div className="stat clickable" onClick={() => navigate('/profile/bookings')}>
              <h4>{myBookings.length}</h4>
              <span>My Bookings</span>
            </div>
            <div className="stat">
              <h4>
                {lastBookingDate
                  ? new Date(lastBookingDate).toLocaleDateString()
                  : '--'}
              </h4>
              <span>Last Booking</span>
            </div>
            <div className="stat">
              <h4>--</h4>
              <span>Favorites</span>
            </div>
          </div>


          <hr />
          <p>Explore more tours and plan your next adventure!</p>

          {/* ======== Featured hotels section ========== */}
          <div className="featured-hotels">
            <h5>Special Featured Hotels (10% off)</h5>
            <div className="featured-list">
              {randomThree.map((hotel) => {
                const discountedPrice = (hotel.price * 0.9).toFixed(2)

                return (
                  <div className="featured-item" key={hotel._id}>
                    <div className="featured-img">
                      {/* 
                        Link to detail page with discount param, 
                        so we can apply discount on TourDetails 
                      */}
                      <Link to={`/hotels/${hotel._id}?discount=0.9`}>
                        <img src={hotel.photo} alt={hotel.title} />
                      </Link>
                    </div>
                    <div className="featured-info">
                      <h6>
                        <Link to={`/hotels/${hotel._id}?discount=0.9`}>
                          {hotel.title}
                        </Link>
                      </h6>
                      <p className="city">{hotel.city}</p>
                      <p className="price">
                        Now <strong>${discountedPrice}</strong> /person
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      ) : (
        <p>
          Please <strong>login</strong> to view your profile overview.
        </p>
      )}
    </div>
  )
}

export default Overview
