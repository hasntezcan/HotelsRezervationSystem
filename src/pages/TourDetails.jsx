import React, { useState, useRef, useEffect, useContext } from 'react';
import '../styles/tour-details.css';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import calculateAvgRating from '../utils/avgRating';
import avatar from '../assets/images/avatar.jpg';
import Booking from '../components/Booking/Booking';
import { AuthContext } from '../context/AuthContext';
import Room from '../components/Room/Room';

const TourDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const [tour, setTour] = useState(null);
  const [tourRating, setTourRating] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState('');
  const reviewMsgRef = useRef('');
  const { user } = useContext(AuthContext);

  const handleRoomSelect = (room) => {
    // If they click the same room twice, you can deselect, or keep it. Optional:
    setSelectedRoom(prev => (prev && prev.id === room.id) ? null : room);
  };

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/hotels/${id}`);
        setTour(response.data);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchHotel();
    window.scrollTo(0, 0);
  }, [id]);

  if (!tour) {
    return <h4>Loading hotel data...</h4>;
  }

  // Determine primary image from hotel's images array
  const primaryImageUrl = tour.images?.find(img => img.isPrimary)?.imageUrl ||
                          tour.images?.[0]?.imageUrl ||
                          'https://via.placeholder.com/400x300?text=No+Image';

  // Map backend hotel fields to variables used in this page
  const name = tour.name;
  const desc = tour.description;
  const price = tour.pricePerNight;
  const reviews = tour.reviews || [];
  const city = tour.city;
  const address = tour.address;
  const capacity = tour.capacity;

  // For amenities, if backend data is missing or empty, use dummy amenities
  const dummyAmenities = tour.amenities 
    ? tour.amenities.split(',').map(a => a.trim())
    : ['Free Wi-Fi', 'Breakfast Included', 'Air Conditioning'];

  // Apply discount if provided in URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const discountParam = queryParams.get('discount');
  let actualPrice = price;
  if (discountParam) {
    const disc = parseFloat(discountParam);
    if (!isNaN(disc) && disc > 0 && disc < 1) {
      actualPrice = parseFloat((price * disc).toFixed(2));
    }
  }

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const submitHandler = (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    if (!user) {
      alert('Please sign in');
      return;
    }
    const newReview = {
      username: user?.username || 'Guest',
      reviewText,
      rating: tourRating,
      createdAt: new Date().toISOString(),
    };
    if (!reviews) {
      tour.reviews = [];
    }
    tour.reviews.push(newReview);
    // Ideally, you would send this data to the backend to update the hotel record.
    alert('Review submitted successfully!');
    reviewMsgRef.current.value = '';
    setTourRating(null);
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8">
            <div className="tour__content">
              <img src={primaryImageUrl} alt="Hotel" />

              <div className="tour__info">
                <h2>{name}</h2>
                <div className="d-flex align-items-center gap-5">
                  <span className="tour__rating d-flex align-items-center gap-1">
                    <i className="ri-star-fill" style={{ color: 'var(--secondary-color)' }}></i>
                    {avgRating === 0 ? null : avgRating}
                    {avgRating === 0 ? 'Not rated' : <span>({reviews.length})</span>}
                  </span>
                  <span>
                    <i className="ri-map-pin-fill"></i> {address}
                  </span>
                  <span>
                    <i className="ri-map-pin-2-line"></i> {city}
                  </span>
                </div>

                

                <div className="tour__amenities">
                  <ul>
                    {dummyAmenities.map((amenity, index) => (
                      <li key={index}>
                        <i className="ri-checkbox-circle-line"></i> {amenity}
                      </li>
                    ))}
                  </ul>
                </div>

                <h5>Description</h5>
                <p>{desc}</p>
              </div>
              
              <div className="tour__rooms mt-4">
                <h4 className="mb-3">Select Your Room</h4>
                <Room
                  hotelId={tour.hotelId}
                  selectedRoom={selectedRoom}
                  onRoomSelect={handleRoomSelect}
                />
              </div>

              <div className="tour__reviews mt-4">
                <h4>Reviews ({reviews.length})</h4>
                <Form onSubmit={submitHandler}>
                  <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <span
                        key={num}
                        onClick={() => setTourRating(num)}
                        className={tourRating === num ? "selected-rating" : ""}
                      >
                        {num} <i className="ri-star-s-fill"></i>
                      </span>
                    ))}
                  </div>
                  <div className="review__input">
                    <input
                      type="text"
                      ref={reviewMsgRef}
                      placeholder="Share your thoughts"
                      required
                    />
                    <button className="btn primary__btn text-white" type="submit">
                      Submit
                    </button>
                  </div>
                </Form>
                <ListGroup className="user__reviews">
                  {reviews.map((review, index) => (
                    <div className="review__item" key={index}>
                      <img src={avatar} alt="" />
                      <div className="w-100">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h5>{review.username}</h5>
                            <p>{new Date(review.createdAt).toLocaleDateString()}</p>
                          </div>
                          <span className="d-flex align-items-center">
                            {review.rating}
                            <i className="ri-star-s-fill"></i>
                          </span>
                        </div>
                        <h6>{review.reviewText}</h6>
                      </div>
                    </div>
                  ))}
                </ListGroup>
              </div>
            </div>
          </Col>

          <Col lg="4" className="mt-4 mt-lg-0">
          <Booking
              tour={{ ...tour, price: actualPrice }}
              avgRating={avgRating}
              selectedRoom={selectedRoom}
          />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TourDetails;