import React, { useState, useEffect } from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // ✅ i18n
import './tour-card.css';
import LoadingSpinner from '../shared/Loading/Spinner';

const TourCard = ({ mini = false, tour, checkIn, checkOut }) => {
  const { t, i18n } = useTranslation(); // ✅ i18n hook
  const { hotelId, _id } = tour;
  const id = hotelId || _id;

  const [hotel, setHotel] = useState(tour);
  const [price, setPrice] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const currentImage = galleryImages[activeImageIndex];

  const nextImage = () =>
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);

  const prevImage = () =>
    setActiveImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );

  useEffect(() => {
    setHotel(tour);
  }, [tour]);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:8080/api/hotel-images/${id}/primary`)
      .then((res) => {
        if (!res.ok) throw new Error("Resim yüklenemedi");
        return res.json();
      })
      .then((data) => {
        if (data?.imageUrl) {
          setHotel((prev) => ({ ...prev, primaryImageUrl: data.imageUrl }));
        }
      })
      .catch((err) => console.error("Primary resim hatası:", err));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:8080/api/hotel-images/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setGalleryImages(data);
      })
      .catch((err) => console.error("Tüm görseller alınamadı", err));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:8080/api/hotels/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Hotel verisi alınamadı");
        return res.json();
      })
      .then((data) => {
        setHotel((prev) => ({
          ...data,
          primaryImageUrl: prev.primaryImageUrl,
        }));
      })
      .catch((err) => console.error("Otel detay hatası:", err));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:8080/api/rooms/hotel/${id}/min-price`)
      .then((res) => {
        if (!res.ok) throw new Error("Fiyat alınamadı");
        return res.json();
      })
      .then((data) => {
        if (data.minPrice !== undefined && data.minPrice !== null) {
          setPrice(data.minPrice);
        } else {
          setPrice(null);
        }
      })
      .catch((err) => {
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
          {currentImage?.imageUrl ? (
            <div className="tour__img-carousel">
              <button className="img-nav left" onClick={prevImage}>
                &#10094;
              </button>
              <img src={currentImage.imageUrl} alt="hotel-img" />
              <button className="img-nav right" onClick={nextImage}>
                &#10095;
              </button>
            </div>
          ) : (
            <LoadingSpinner />
          )}
          {hotel.starRating >= 4 && <span>{t('tour_card.featured')}</span>}
        </div>

        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="tour__location d-flex align-items-center gap-1">
              <i className='ri-map-pin-line'></i> {hotel.city}
            </span>
            <span className="tour__rating d-flex align-items-center gap-1">
              <i className='ri-star-fill'></i>
              {hotel.starRating
                ? `${hotel.starRating} / 5`
                : t('tour_card.not_rated')}
            </span>
          </div>

          <h5 className='tour__title'>
            <Link to={`/hotels/${id}`}>{hotel.name}</Link>
          </h5>

          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              {price !== null && !isNaN(price)
                ? `$${parseFloat(price).toFixed(2)}`
                : t('tour_card.no_rooms')}
              <span>{t('tour_card.per_night')}</span>
            </h5>
            <Link to={bookingUrl}>
              <button className='booking__btn'>{t('tour_card.book_now')}</button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard;
