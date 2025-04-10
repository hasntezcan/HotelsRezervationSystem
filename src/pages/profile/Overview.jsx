// src/pages/profile/Overview.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import hotelsData from '../../assets/data/hotels';
import '../../styles/profile.css';

const Overview = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [myBookings, setMyBookings] = useState([]);
  const [lastBookingDate, setLastBookingDate] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch user bookings from backend using userId
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.userId) return;

      try {
        const res = await fetch(`http://localhost:8080/api/bookings/user/${user.userId}`);
        if (!res.ok) throw new Error('Failed to fetch bookings');

        const data = await res.json();
        setMyBookings(data);

        // Sort and find latest booking date
        if (data.length > 0) {
          const sorted = [...data].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setLastBookingDate(sorted[0].createdAt);
        }
      } catch (err) {
        console.error('Error fetching user bookings:', err.message);
      }
    };

    fetchBookings();
  }, [user]);

  // Random featured hotel logic (static)
  const featuredHotels = hotelsData.filter((h) => h.featured);
  const shuffleArray = [...featuredHotels].sort(() => 0.5 - Math.random());
  const randomThree = shuffleArray.slice(0, 3);

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

          {/* Featured Hotels Section */}
          <div className="featured-hotels">
            <h5>Special Featured Hotels (10% off)</h5>
            <div className="featured-list">
              {randomThree.map((hotel) => {
                const discountedPrice = (hotel.price * 0.9).toFixed(2);

                return (
                  <div className="featured-item" key={hotel._id}>
                    <div className="featured-img">
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
                );
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
  );
};

export default Overview;
