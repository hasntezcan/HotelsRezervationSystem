import React, { useState, useEffect } from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import './tour-card.css';

const TourCard = ({ tour, checkIn, checkOut }) => {
  const { hotelId, _id } = tour;
  const id = hotelId || _id;

  const [hotel, setHotel] = useState(tour);
  const [price, setPrice] = useState(null); // ✅ separate price state

  useEffect(() => {
    setHotel(tour);
  }, [tour]);

  // ✅ Get primary hotel image
  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:8080/api/hotel-images/${id}/primary`)
      .then(res => {
        if (!res.ok) throw new Error("Resim yüklenemedi");
        return res.json();
      })
      .then(data => {
        if (data?.imageUrl) {
          setHotel(prev => ({ ...prev, primaryImageUrl: data.imageUrl }));
        }
      })
      .catch(err => console.error("Primary resim hatası:", err));
  }, [id]);

  // ✅ Get full hotel info
  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:8080/api/hotels/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Hotel verisi alınamadı");
        return res.json();
      })
      .then(data => {
        setHotel(prev => ({ ...data, primaryImageUrl: prev.primaryImageUrl }));
      })
      .catch(err => console.error("Otel detay hatası:", err));
  }, [id]);

  // ✅ Get min room price
  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:8080/api/rooms/hotel/${id}/min-price`)
      .then(res => {
        if (!res.ok) throw new Error("Fiyat alınamadı");
        return res.json();
      })
      .then(data => {
        if (data.minPrice !== undefined && data.minPrice !== null) {
          setPrice(data.minPrice);
        } else {
          setPrice(null);
        }
      })
      .catch(err => {
        console.error("Fiyat hatası:", err);
        setPrice(null);
      });
  }, [id]);

  const bookingUrl =
    checkIn && checkOut
      ? `/hotels/${id}?startDate=${checkIn}&endDate=${checkOut}`
      : `/hotels/${id}`;

  return (
    <div className='tour__card'>
      <Card>
        <div className="tour__img">
          {hotel.primaryImageUrl ? (
            <img src={hotel.primaryImageUrl} alt="hotel-img" />
          ) : (
            <div style={{
              height: '200px',
              backgroundColor: '#eee',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              Yükleniyor...
            </div>
          )}
          {hotel.starRating >= 4 && <span>Featured</span>}
        </div>

        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="tour__location d-flex align-items-center gap-1">
              <i className='ri-map-pin-line'></i> {hotel.city}
            </span>
            <span className="tour__rating d-flex align-items-center gap-1">
              <i className='ri-star-fill'></i>
              {hotel.starRating ? `${hotel.starRating} / 5` : 'Not rated'}
            </span>
          </div>

          <h5 className='tour__title'>
            <Link to={`/hotels/${id}`}>{hotel.name}</Link>
          </h5>

          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              {price !== null && !isNaN(price)
                ? `$${parseFloat(price).toFixed(2)}`
                : 'No rooms available'}
              <span>/per night</span>
            </h5>
            <Link to={bookingUrl}>
              <button className='booking__btn'>Book Now</button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard;
