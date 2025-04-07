import React from 'react'
import { Card, CardBody } from 'reactstrap'
import { Link } from 'react-router-dom'
import './tour-card.css'
import calculateAvgRating from '../utils/avgRating'

const TourCard = ({ tour }) => {
  const { hotelId, title, city, imgUrl, price, featured, reviews, rating } = tour

  // Eğer reviews verisi varsa ortalama hesapla, yoksa rating göster
  const { avgRating } = calculateAvgRating(reviews || [])
  const displayRating = reviews && reviews.length > 0 ? avgRating : rating || 'Not rated'

  return (
    <div className='tour__card'>
      <Card>
        <div className="tour__img">
          <img src={imgUrl} alt="hotel-img" />
          {featured && <span>Featured</span>}
        </div>

        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="tour__location d-flex align-items-center gap-1">
              <i className='ri-map-pin-line'></i> {city}
            </span>
            <span className="tour__rating d-flex align-items-center gap-1">
              <i className='ri-star-fill'></i> 
              {displayRating}
              {reviews && reviews.length > 0 ? <span>({reviews.length})</span> : ''}
            </span>
          </div>

          <h5 className='tour__title'>
            <Link to={`/hotels/${hotelId}`}>{title}</Link>
          </h5>

          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>${price} <span>/per person</span></h5>
            <Link to={`/hotels/${hotelId}`}>
              <button className='booking__btn'>Book Now</button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default TourCard
