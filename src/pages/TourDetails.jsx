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
import HotelGallery from '../shared/HotelGallery';

const TourDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const [tour, setTour] = useState(null);
  const [tourRating, setTourRating] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [reviews, setReviews] = useState([]);
  const reviewMsgRef = useRef('');
  const { user } = useContext(AuthContext);

  const [initialAdults, setInitialAdults] = useState(1);
  const [initialChildren, setInitialChildren] = useState(0);

  const handleRoomSelect = async (room) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/rooms/${room.id}`);
      const fullRoom = response.data;
      setSelectedRoom(fullRoom);
    } catch (err) {
      console.error('Error fetching room details:', err);
    }
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

    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/reviews/hotel/${id}`);
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchHotel();
    fetchReviews();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const adults = parseInt(queryParams.get('adults'));
    const children = parseInt(queryParams.get('children'));

    if (!isNaN(adults)) setInitialAdults(adults);
    if (!isNaN(children)) setInitialChildren(children);
  }, [location.search]);

  if (!tour) return <h4>Loading hotel data...</h4>;

  const name = tour.name;
  const desc = tour.description;
  const price = tour.pricePerNight;
  const city = tour.city;
  const address = tour.address;

  const dummyAmenities = tour.amenities 
    ? tour.amenities.split(',').map(a => a.trim())
    : ['Free Wi-Fi', 'Breakfast Included', 'Air Conditioning'];

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

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    if (!user) {
      alert('Please sign in');
      return;
    }

    try {
      const newReview = {
        userId: user.id,
        hotelId: parseInt(id),
        rating: tourRating,
        comment: reviewText
      };

      const res = await axios.post("http://localhost:8080/api/reviews", newReview, {
        withCredentials: true
      });
      setReviews(prev => [...prev, res.data]);

      alert('Review submitted successfully!');
      reviewMsgRef.current.value = '';
      setTourRating(null);
    } catch (error) {
      console.error("Failed to submit review:", error);
      alert("Failed to submit review.");
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8">
            <div className="tour__content">

              <div className="tour__gallery">
                <HotelGallery images={tour.images} />
              </div>

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
                            <p>
                              {typeof review.createdAt === 'string'
                                ? new Date(review.createdAt.replace(' ', 'T')).toLocaleDateString()
                                : 'Just now'}
                            </p>
                          </div>
                          <span className="d-flex align-items-center">
                            {review.rating}
                            <i className="ri-star-s-fill"></i>
                          </span>
                        </div>
                        <h6>{review.comment}</h6>
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
              initialAdults={initialAdults}
              initialChildren={initialChildren}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TourDetails;