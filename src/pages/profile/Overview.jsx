// src/pages/profile/Overview.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import hotelsData from '../../assets/data/hotels';
import { useTranslation } from 'react-i18next';
import '../../styles/profile.css';

const Overview = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [myBookings, setMyBookings] = useState([]);
  const [lastBookingDate, setLastBookingDate] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.userId) return;

      try {
        const res = await fetch(`http://localhost:8080/api/bookings/user/${user.userId}`);
        if (!res.ok) throw new Error('Failed to fetch bookings');

        const data = await res.json();
        setMyBookings(data);

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

  const featuredHotels = hotelsData.filter((h) => h.featured);
  const shuffleArray = [...featuredHotels].sort(() => 0.5 - Math.random());
  const randomThree = shuffleArray.slice(0, 3);

  return (
    <div>
      <h2>{t('overview.title')}</h2>

      {user ? (
        <>
          <p>{t('overview.welcome')}, <strong>{user.username}</strong>.</p>
          <p>{t('overview.email')}: {user.email}</p>
          <hr />

          <div className="stats-box">
            <div className="stat clickable" onClick={() => navigate('/profile/bookings')}>
              <h4>{myBookings.length}</h4>
              <span>{t('overview.my_bookings')}</span>
            </div>
            <div className="stat">
              <h4>
                {lastBookingDate
                  ? new Date(lastBookingDate).toLocaleDateString()
                  : '--'}
              </h4>
              <span>{t('overview.last_booking')}</span>
            </div>
            <div className="stat">
              <h4>--</h4>
              <span>{t('overview.favorites')}</span>
            </div>
          </div>

          <hr />
          <p>{t('overview.explore_more')}</p>

          <div className="featured-hotels">
            <h5>{t('overview.featured_title')}</h5>
            <div className="featured-list">
              {randomThree.map((hotel) => {
                const discountedPrice = (hotel.price).toFixed(2);

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
                        {t('overview.now')} <strong>${discountedPrice}</strong> /{t('overview.per_person')}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <p>{t('overview.login_prompt')}</p>
      )}
    </div>
  );
};

export default Overview;
