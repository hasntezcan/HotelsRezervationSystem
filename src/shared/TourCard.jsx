import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import './tour-card.css';

const TourCard = ({ tour }) => {
  const {
    hotelId,
    name,
    city,
    pricePerNight,
    primaryImageUrl,
    starRating,
  } = tour;

  return (
    <div className='tour__card'>
      <Card>
        <div className="tour__img">
          <img src={primaryImageUrl} alt="hotel-img" />
          {starRating >= 4 && <span>Featured</span>}
        </div>

        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="tour__location d-flex align-items-center gap-1">
              <i className='ri-map-pin-line'></i> {city}
            </span>
            <span className="tour__rating d-flex align-items-center gap-1">
              <i className='ri-star-fill'></i>
              {starRating ? `${starRating} / 5` : 'Not rated'}
            </span>
          </div>

          <h5 className='tour__title'>
            <Link to={`/hotels/${hotelId}`}>{name}</Link>
          </h5>

          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>${pricePerNight} <span>/per night</span></h5>
            <Link to={`/hotels/${hotelId}`}>
              <button className='booking__btn'>Book Now</button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard;
