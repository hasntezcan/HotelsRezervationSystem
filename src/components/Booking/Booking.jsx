import React, { useState, useContext, useEffect } from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useToast } from '../../shared/Errors/ToastContext';
import FormError from '../../shared/Errors/FormError';


const Booking = ({ tour, avgRating, selectedRoom, initialAdults = 1, initialChildren = 0 }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const { showToast } = useToast();

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

  // Geçersiz tarih kontrolü
  useEffect(() => {
    const sDate = new Date(booking.startDate);
    const eDate = new Date(booking.endDate);

    if (booking.startDate && booking.endDate && sDate >= eDate) {
      const newEndDate = new Date(sDate);
      newEndDate.setDate(sDate.getDate() + 1);
      setBooking((prev) => ({
        ...prev,
        endDate: newEndDate.toISOString().split('T')[0],
      }));
    }

    if (booking.startDate && booking.endDate) {
      const calculatedNights = Math.max(1, Math.round((eDate - sDate) / (1000 * 60 * 60 * 24)));
      setNights(calculatedNights);
    }
  }, [booking.startDate, booking.endDate]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Sadece tam sayı ve sıfırdan büyük değerler
    if ((id === 'adultCount' || id === 'childCount') && (!/^\d+$/.test(value))) {
      return;
    }

    setBooking((prev) => ({ ...prev, [id]: value }));
  };

  const serviceFee = 10;
  const totalAmount =
    (Number(roomPrice) * nights * Number(booking.adultCount)) +
    (Number(roomPrice) * nights * Number(booking.childCount) * 0.5) +
    serviceFee;

  const handleClick = async (e) => {
    e.preventDefault();

    if (!user) {
      showToast(t('alert_login_required'), 'warning');
      return;
    }

    if (!booking.startDate || !booking.endDate || !selectedRoom) {
      showToast(t('alert_fields_required'), 'warning');
      return;
    }

    const sDate = new Date(booking.startDate);
    const eDate = new Date(booking.endDate);

    if (sDate.toString() === 'Invalid Date' || eDate.toString() === 'Invalid Date') {
      showToast(t('alert_invalid_dates'), 'error');
      return;
    }

    if (sDate >= eDate) {
      showToast(t('alert_checkout_after_checkin'), 'error');
      return;
    }

    const numGuests = Number(booking.adultCount) + Number(booking.childCount);
    if (numGuests > selectedRoom.capacity) {
    showToast(t('alert_guest_limit', { capacity: selectedRoom.capacity }), 'warning');
      return;
    }

    if (numGuests < 1) {
      showToast(t('alert_minimum_guests'), 'warning');
      return;
    }

    try {
      const availabilityRes = await fetch(
        `http://localhost:8080/api/bookings/check-availability?roomId=${selectedRoom.id}&checkIn=${booking.startDate}&checkOut=${booking.endDate}`
      );
      const isAvailable = await availabilityRes.json();

      if (!isAvailable) {
        showToast(t('alert_room_unavailable'), 'warning');
        return;
      }
    } catch (err) {
      console.error('Error checking availability:', err);
      showToast(t('alert_check_error'), 'error');
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
          <span>{t('per_night')}</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i className="ri-star-fill" style={{ color: 'var(--secondary-color)' }}></i>
          {avgRating === 0 ? null : avgRating} ({reviews.length})
        </span>
      </div>

      <div className="booking__form">
        <h5>{t('info')}</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup className="d-flex align-items-center gap-3">
            <div className="date-box">
              <label>{t('start_date')}</label>
              <input
                type="date"
                id="startDate"
                onChange={handleChange}
                value={booking.startDate}
                min={today}
                onKeyDown={(e) => e.preventDefault()}
              />
            </div>
            <div className="date-box">
              <label>{t('end_date')}</label>
              <input
                type="date"
                id="endDate"
                onChange={handleChange}
                value={booking.endDate}
                min={booking.startDate || today}
                onKeyDown={(e) => e.preventDefault()}
              />
            </div>
          </FormGroup>

          <FormGroup className="d-flex align-items-center gap-3">
            <div className="count-box">
              <label>{t('adults')}</label>
              <input
                type="number"
                id="adultCount"
                min="0"
                step="1"
                onChange={handleChange}
                value={booking.adultCount}
              />
            </div>
            <div className="count-box">
              <label>{t('children')}</label>
              <input
                type="number"
                id="childCount"
                min="0"
                step="1"
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
            <h5>{t('service_charge')}</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>{t('total')}</h5>
            <span>${totalAmount.toFixed(2)}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
          {t('book_now')}
        </Button>
      </div>
    </div>
  );
};

export default Booking;
