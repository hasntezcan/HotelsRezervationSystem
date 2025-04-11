import React, { useState, useEffect } from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import './tour-card.css';

const TourCard = ({ tour, checkIn, checkOut }) => {
  // tour nesnesinde hotelId veya _id olabilir, hangisi varsa onu kullanıyoruz.
  const { hotelId, _id } = tour;
  const id = hotelId || _id; // ID değeri

  // Otel bilgilerini state'e alıyoruz.
  const [hotel, setHotel] = useState(tour);

  // Eğer tour prop’u değişirse, state’i güncelleyelim.
  useEffect(() => {
    setHotel(tour);
  }, [tour]);

  useEffect(() => {
    // Eğer id tanımlı değilse isteği göndermiyoruz.
    if (!id) {
      console.error("Hotel ID bulunamadı. tour nesnesi:", tour);
      return;
    }

    // Backend'deki HotelImageController'dan primary resmi getiren endpoint çağrılıyor.
    fetch(`http://localhost:8080/api/hotel-images/${id}/primary`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Hata: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data && data.imageUrl) {
          // Mevcut otel verilerine primaryImageUrl bilgisini ekliyoruz.
          setHotel(prevHotel => ({ ...prevHotel, primaryImageUrl: data.imageUrl }));
        }
      })
      .catch(error => console.error('Primary resim alınırken hata oluştu:', error));
  }, [id, tour]);

  // Otelin tam bilgilerini getirmek için yeni bir fetch isteği.
  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:8080/api/hotels/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Hata: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Önceki primaryImageUrl bilgisini korumak için mevcut state ile birleştiriyoruz.
        setHotel(prevHotel => ({ ...data, primaryImageUrl: prevHotel.primaryImageUrl }));
      })
      .catch(error => console.error('Otel bilgileri alınırken hata oluştu:', error));
  }, [id]);

  // Tarihler varsa, booking URL'si buna göre oluşturuluyor.
  const bookingUrl = checkIn && checkOut
    ? `/hotels/${id}?startDate=${checkIn}&endDate=${checkOut}`
    : `/hotels/${id}`;

  return (
    <div className='tour__card'>
      <Card>
        <div className="tour__img">
          {hotel.primaryImageUrl ? (
            <img src={hotel.primaryImageUrl} alt="hotel-img" />
          ) : (
            <div style={{ height: '200px', backgroundColor: '#eee', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
            <h5>${hotel.pricePerNight} <span>/per night</span></h5>
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
