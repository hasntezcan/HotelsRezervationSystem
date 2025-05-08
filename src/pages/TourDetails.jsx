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
import { useTranslation } from 'react-i18next';
import MapView from '../components/MapView';

const TourDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const { t } = useTranslation();

  const [tour, setTour] = useState(null);
  const [tourRating, setTourRating] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [reviews, setReviews] = useState([]);
  const reviewMsgRef = useRef('');
  const { user } = useContext(AuthContext);
  const [realAmenities, setRealAmenities] = useState([]);

  const [initialAdults, setInitialAdults] = useState(1);
  const [initialChildren, setInitialChildren] = useState(0);

  const handleRoomSelect = async (room) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/rooms/${room.id}`);
      setSelectedRoom(response.data);
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
        console.log('Fetched reviews:', res.data);
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchHotel();
    fetchReviews();

    
    axios.get(`http://localhost:8080/api/hotels/${id}/amenities`)
     .then(res => setRealAmenities(res.data))
     .catch(err => console.error("Amenity fetch error:", err));


    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const qp = new URLSearchParams(location.search);
    const adults = parseInt(qp.get('adults'), 10);
    const children = parseInt(qp.get('children'), 10);

    if (!isNaN(adults)) setInitialAdults(adults);
    if (!isNaN(children)) setInitialChildren(children);
  }, [location.search]);

  if (!tour) return <h4>Loading hotel data...</h4>;

  const { name, description: desc, pricePerNight: price, city, address, amenities } = tour;

  const dummyAmenities = amenities
    ? amenities.split(',').map(a => a.trim())
    : ['Free Wi-Fi', 'Breakfast Included', 'Air Conditioning'];

  const discountParam = new URLSearchParams(location.search).get('discount');
  let actualPrice = price;
  if (discountParam) {
    const disc = parseFloat(discountParam);
    if (!isNaN(disc) && disc > 0 && disc < 1) {
      actualPrice = +(price * disc).toFixed(2);
    }
  }

  const { avgRating } = calculateAvgRating(reviews);

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    if (!user) {
      alert('Please sign in');
      return;
    }
    if (!tourRating) {
      alert('Please select a rating');
      return;
    }

    // 1) Inspect the AuthContext user object to find the correct ID field:
    console.log('Auth user:', user);

    // 2) Derive a numeric user ID (adjust property name if needed):
    const rawUserId = user.id ?? user.userId ?? user._id;
    const parsedUserId = parseInt(rawUserId, 10);

    // 3) Build and log the payload once:
    const newReview = {
      userId: parsedUserId,
      hotelId: parseInt(id, 10),
      rating: tourRating,
      comment: reviewText
    };
    console.log('🚀 Sending review:', newReview);

    try {
      const res = await axios.post(
        'http://localhost:8080/api/reviews',
        newReview,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      setReviews(prev => [...prev, res.data]);
      
      alert('Review submitted successfully!');
      reviewMsgRef.current.value = '';
      setTourRating(null);
    } catch (error) {
      console.error('Failed to submit review:', error);
      alert('Failed to submit review.');
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
                    <i className="ri-star-fill" style={{ color: 'var(--secondary-color)' }} />
                    {avgRating > 0 && avgRating}
                    {avgRating === 0 ? t('tour_details.not_rated') : <span>({reviews.length})</span>}
                  </span>
                  <span><i className="ri-map-pin-fill" /> {address}</span>
                  <span><i className="ri-map-pin-2-line" /> {city}</span>
                </div>

                <div className="tour__amenities">
                  <ul>
                    {dummyAmenities.map((amenity, i) => (
                      <li key={i}><i className="ri-checkbox-circle-line" /> {amenity}</li>
                    ))}
                  </ul>
                </div>

                <h5 className="mt-3">{t('tour_details.description')}</h5>
                <p>{desc}</p>

                <div className="tour__map mt-4">
                    <h5>{t('tour_details.map_location', 'Location')}</h5>
                    <MapView
                      center={[tour.latitude, tour.longitude]}
                      zoom={13}
                      markers={[{
                        id: tour.hotelId,
                        position: [tour.latitude, tour.longitude],
                        popup: null              // istersen burada otel adını da gösterebilirsin
                      }]}
                    />
                  </div>
              </div>



                  {/* ======= OTEL KONUM HARİTASI ======= */}
                  


              <div className="tour__rooms mt-4">
                <h4 className="mb-3">{t('tour_details.select_room')}</h4>
                <Room
                  hotelId={tour.hotelId}
                  selectedRoom={selectedRoom}
                  onRoomSelect={handleRoomSelect}
                />
              </div>

              <div className="tour__reviews mt-4">
                <h4>{t('tour_details.reviews', { count: reviews.length })}</h4>
                <Form onSubmit={submitHandler}>
                  <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                    {[1,2,3,4,5].map(num => (
                      <span
                        key={num}
                        onClick={() => setTourRating(num)}
                        className={tourRating === num ? 'selected-rating' : ''}
                      >
                        {num} <i className="ri-star-s-fill" />
                      </span>
                    ))}
                  </div>
                  <div className="review__input">
                    <input
                      type="text"
                      ref={reviewMsgRef}
                      placeholder={t('tour_details.placeholder_review')}
                      required
                    />
                    <button className="btn primary__btn text-white" type="submit">
                      {t('tour_details.submit_review')}
                    </button>
                  </div>
                </Form>
                <ListGroup className="user__reviews">
                  {reviews.map((review, idx) => (
                    <div className="review__item" key={idx}>
                      <img src={avatar} alt="" />
                      <div className="w-100">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h5>{review.username}</h5>
                            <p>
                              {typeof review.createdAt === 'string'
                                ? new Date(review.createdAt.replace(' ', 'T')).toLocaleDateString()
                                : t('tour_details.just_now')}
                            </p>
                          </div>
                          <span className="d-flex align-items-center">
                            {review.rating} <i className="ri-star-s-fill" />
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
