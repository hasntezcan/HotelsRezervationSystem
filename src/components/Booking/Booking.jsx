import React, { useState, useContext, useEffect } from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Booking = ({ tour, avgRating, selectedRoom, initialAdults = 1, initialChildren = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const queryParams = new URLSearchParams(location.search);
  const defaultStartDate = queryParams.get('startDate') || '';
  const defaultEndDate = queryParams.get('endDate') || '';

  const roomName = selectedRoom ? selectedRoom.name : tour.title;
  const roomPrice = selectedRoom ? selectedRoom.pricePerNight : tour.price;
  const reviews = tour.reviews || [];

  const today = new Date().toISOString().split('T')[0];

  const [nights, setNights] = useState(1);

  const [booking, setBooking] = useState({
    userId: user && user.userId,
    userEmail: user && user.email,
    tourName: roomName,
    fullName: '',
    phone: '',
    adultCount: initialAdults,
    childCount: initialChildren,
    startDate: defaultStartDate,
    endDate: defaultEndDate
  });

  useEffect(() => {
    if (booking.startDate && booking.endDate) {
      const sDate = new Date(booking.startDate);
      const eDate = new Date(booking.endDate);
      const calculatedNights = Math.max(1, Math.round((eDate - sDate) / (1000 * 60 * 60 * 24)));
      setNights(calculatedNights);
    }
  }, [booking.startDate, booking.endDate]);

  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 10;
  const totalAmount =
    (Number(roomPrice) * nights * Number(booking.adultCount)) +
    (Number(roomPrice) * nights * Number(booking.childCount) * 0.5) +
    serviceFee;

  const handleClick = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Please sign in first.');
      return;
    }

    if (!booking.startDate || !booking.endDate || !selectedRoom) {
      alert('All fields are required! Please select room type, check-in and check-out dates.');
      return;
    }

    const sDate = new Date(booking.startDate);
    const eDate = new Date(booking.endDate);
    if (sDate.toString() === 'Invalid Date' || eDate.toString() === 'Invalid Date') {
      alert('Please select valid dates.');
      return;
    }

    if (sDate >= eDate) {
      alert('Check-out date must be after check-in date.');
      return;
    }

    const numGuests = Number(booking.adultCount) + Number(booking.childCount);
    if (numGuests > selectedRoom.capacity) {
      alert(`This room can only accommodate up to ${selectedRoom.capacity} guests.`);
      return;
    }

    if (numGuests < 1) {
      alert('At least 1 adult or child is required.');
      return;
    }

    try {
      const availabilityRes = await fetch(
        `http://localhost:8080/api/bookings/check-availability?roomId=${selectedRoom.id}&checkIn=${booking.startDate}&checkOut=${booking.endDate}`
      );
      const isAvailable = await availabilityRes.json();

      if (!isAvailable) {
        alert('The selected room is not available for the chosen date range. Please choose another.');
        return;
      }
    } catch (err) {
      console.error('Error checking availability:', err);
      alert('Something went wrong during availability check.');
      return;
    }

    const bookingPayload = {
      ...booking,
      numGuests,
      nights,
      totalAmount: totalAmount.toFixed(2),
      roomId: selectedRoom.id,
      hotelId: tour.hotelId,
      roomName: selectedRoom.name,
      pricePerNight: roomPrice,
    };

    localStorage.setItem('userId', user.userId);
    localStorage.setItem('pendingBooking', JSON.stringify(bookingPayload));

    navigate('/payment');
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${roomPrice}
          <span>/per night</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i className="ri-star-fill" style={{ color: 'var(--secondary-color)' }}></i>
          {avgRating === 0 ? null : avgRating} ({reviews.length})
        </span>
      </div>

      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
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
                min="0"
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
  );
};

export default Booking;
