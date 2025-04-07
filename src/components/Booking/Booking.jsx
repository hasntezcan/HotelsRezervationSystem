// src/components/Booking/Booking.jsx

import React, { useState, useContext } from 'react'
import './booking.css'
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName: '',
    phone: '',
    adultCount: 1,
    childCount: 0,
    startDate: '',
    endDate: ''
  })

  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const serviceFee = 10
  // Price Calculation: child = 50% discount
  const totalAmount = (
    Number(price) * Number(booking.adultCount) +
    Number(price) * Number(booking.childCount) * 0.5 +
    serviceFee
  )

  const handleClick = (e) => {
    e.preventDefault()

    if (!user) {
      alert('Please sign in first.')
      return
    }

    // 1) Basic required field checks
    if (
      !booking.fullName.trim() ||
      !booking.phone.trim() ||
      !booking.startDate ||
      !booking.endDate
    ) {
      alert('Please fill all required fields.')
      return
    }

    // 2) Regex validations
    // Full name: letters + spaces only
    const nameRegex = /^[A-Za-z\s]+$/
    if (!nameRegex.test(booking.fullName)) {
      alert('Full name can only contain letters and spaces.')
      return
    }

    // Phone: optional +, then 7–15 digits
    const phoneRegex = /^\+?\d{7,15}$/
    if (!phoneRegex.test(booking.phone)) {
      alert('Invalid phone format. Must be 7–15 digits, without spaces.')
      return
    }

    // 3) Date validations
    const sDate = new Date(booking.startDate)
    const eDate = new Date(booking.endDate)
    if (sDate.toString() === 'Invalid Date' || eDate.toString() === 'Invalid Date') {
      alert('Please select valid start/end dates.')
      return
    }
    if (sDate > eDate) {
      alert('End date cannot be earlier than start date.')
      return
    }

    // 4) Count validations
    if (Number(booking.adultCount) < 1 && Number(booking.childCount) < 1) {
      alert('At least 1 adult or child is required.')
      return
    }

    // 5) Save to localStorage
    let existingBookings = JSON.parse(localStorage.getItem('bookings')) || []
    existingBookings.push({
      ...booking,
      totalAmount,
      createdAt: new Date().toISOString()
    })
    localStorage.setItem('bookings', JSON.stringify(existingBookings))

    alert('Booking successful!')
    navigate('/thank-you')
  }

  // Compute today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${price}
          <span>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i
            className="ri-star-fill"
            style={{ color: 'var(--secondary-color)' }}
          ></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              onChange={handleChange}
              value={booking.fullName}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="tel"
              placeholder="Phone"
              id="phone"
              onChange={handleChange}
              value={booking.phone}
            />
          </FormGroup>

          <FormGroup className="d-flex align-items-center gap-3">
            <div className="date-box">
              <label>Start Date</label>
              <input 
                type="date" 
                id="startDate" 
                onChange={handleChange} 
                value={booking.startDate}
                min={today} 
              />
            </div>
            <div className="date-box">
              <label>End Date</label>
              <input 
                type="date" 
                id="endDate" 
                onChange={handleChange} 
                value={booking.endDate}
                min={booking.startDate || today} 
              />
            </div>
          </FormGroup>

          <FormGroup className="d-flex align-items-center gap-3">
            <div className="count-box">
              <label>Adults</label>
              <input
                type="number"
                id="adultCount"
                min="1"
                onChange={handleChange}
                value={booking.adultCount}
              />
            </div>
            <div className="count-box">
              <label>Children</label>
              <input
                type="number"
                id="childCount"
                min="0"
                onChange={handleChange}
                value={booking.childCount}
              />
            </div>
          </FormGroup>
        </Form>
      </div>

      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>${totalAmount.toFixed(2)}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
          Book Now
        </Button>
      </div>
    </div>
  )
}

export default Booking
