import React from 'react'
import TourCard from '../../shared/TourCard'
import { Col } from 'reactstrap'
import hotels from '../../assets/data/hotels'

const FeaturedTourList = () => {
  // featured == true olanları çek
  const featuredTours = hotels.filter((hotel) => hotel.featured)

  return (
    <>
      {featuredTours.map((tour) => (
        <Col lg='3' md='4' sm='6' className='mb-4' key={tour._id}>
          <TourCard tour={tour} />
        </Col>
      ))}
    </>
  )
}

export default FeaturedTourList
