import React, { useState, useRef, useEffect, useContext } from 'react';
import '../styles/tour-details.css';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams, useLocation } from 'react-router-dom';
import calculateAvgRating from '../utils/avgRating';
import avatar from '../assets/images/avatar.jpg';
import Booking from '../components/Booking/Booking';
import { AuthContext } from '../context/AuthContext';
import Room from '../components/Room/Room';
import axios from 'axios';

// LOCAL JSON
import hotels from '../assets/data/hotels';

const TourDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const reviewMsgRef = useRef('');
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);

  const [selectedRoom, setSelectedRoom] = useState('');

  const handleRoomSelect = (roomId) => {
    // Aynı karta tıklanırsa seçimi kaldır, farklı karta tıklanırsa yeni seçimi ata
    setSelectedRoom(prev => (prev === roomId ? '' : roomId));
  };

  // Tur verisini bulma
  const tour = hotels.find((item) => item._id === id);
  if (!tour) {
    return <h4>Hotel not found</h4>;
  }

  const { 
    photo, 
    title, 
    desc, 
    price, 
    city, 
    address, 
    maxGroupSize,
    amenities // WiFi, Breakfast Included vb. eklendi
  } = tour;

  const [reviews, setReviews] = useState([]);


  // İndirim kontrolü
  const queryParams = new URLSearchParams(location.search);
  const discountParam = queryParams.get('discount');

  let actualPrice = price;
  if (discountParam) {
    const disc = parseFloat(discountParam);
    if (!isNaN(disc) && disc > 0 && disc < 1) {
      actualPrice = parseFloat((price * disc).toFixed(2));
    }
  }

  useEffect(() => {
    axios.get(`http://localhost:8080/api/reviews/hotel/${id}`)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch reviews:", err);
      });
  }, [id]);
  

  // Ortalama puan hesaplama
  const { totalRating, avgRating } = calculateAvgRating(reviews || []);

  // Yorum ekleme fonksiyonu
  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
  
    if (!user) {
      alert('Please sign in');
      return;
    }
  
    const newReview = {
      userId: user.id,                 // make sure this exists in context
      hotelId: parseInt(id),           // from URL param
      rating: tourRating,
      comment: reviewText
    };
  
    try {
      console.log("Sending review:", newReview);
      await axios.post('http://localhost:8080/api/reviews', newReview);
      alert("Review submitted successfully!");
  
      // Refresh reviews from backend
      const res = await axios.get(`http://localhost:8080/api/reviews/hotel/${id}`);
      setReviews(res.data);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    }
  
    reviewMsgRef.current.value = '';
    setTourRating(null);
  };
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8">
            <div className="tour__content">
              <img src={photo} alt="" />

              <div className="tour__info">
                <h2>{title}</h2>
                <div className="d-flex align-items-center gap-5">
                  <span className="tour__rating d-flex align-items-center gap-1">
                    <i className="ri-star-fill" style={{ color: 'var(--secondary-color)' }}></i>
                    {avgRating === 0 ? null : avgRating}
                    {avgRating === 0 ? 'Not rated' : <span>({reviews?.length})</span>}
                  </span>

                  <span>
                    <i className="ri-map-pin-fill"></i> {address}
                  </span>
                </div>

                <div className="tour__extra-details">
                  <span>
                    <i className="ri-map-pin-2-line"></i> {city}
                  </span>
                  <span>
                    <i className="ri-money-dollar-circle-line"></i> 
                    ${actualPrice} / per person
                  </span>
                  <span>
                    <i className="ri-group-line"></i> {maxGroupSize} people
                  </span>
                </div>

                <div className="tour__amenities">
                {/*  <h5>Amenities</h5> */}
                  <ul>
                    {amenities?.map((amenity, index) => (
                      <li key={index}><i className="ri-checkbox-circle-line"></i> {amenity}</li>
                    ))}
                  </ul>
                </div>

                <h5>Description</h5>
                <p>{desc}</p>
              </div>
             
              <div className="tour__rooms mt-4">
                  <h4 className="mb-3">Select Your Room</h4>
                  <Room
                    selectedRoom={selectedRoom}
                    onRoomSelect={handleRoomSelect}
                  />
              </div>
              

              {/* Yorumlar */}
              <div className="tour__reviews mt-4">
                <h4>Reviews ({reviews?.length})</h4>

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
                  {reviews?.map((review, index) => (
                    <div className="review__item" key={index}>
                      <img src={avatar} alt="avatar" />
                      <div className="w-100">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h5>User #{review.userId}</h5>
                            <p>{new Date(review.createdAt).toLocaleDateString()}</p>
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
            <Booking tour={{ ...tour, price: actualPrice }} avgRating={avgRating} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TourDetails;


