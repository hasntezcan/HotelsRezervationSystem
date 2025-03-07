import React, { useEffect, useState } from 'react';
import '../styles/home.css';
import { Container, Row, Col } from 'reactstrap';
import Subtitle from './../shared/subtitle';
import SearchBar from './../shared/SearchBar';
import ServiceList from '../services/ServiceList';
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList';
import MarketingSection from '../components/MarketingSection/MarketingSection';

// Hotels data import
import hotels from '../assets/data/hotels';

const Home = () => {
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Slideshow için state
  const [currentIndex, setCurrentIndex] = useState(0);


  const images = hotels.map((hotel) => hotel.photo);

  // Her 5 saniyede bir resmi değiştirelim
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <>
      {/* Hero Section */}
      <section
        className="hero__section"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
        }}
      >
        <Container>
          <Row className="align-items-center text-center">
            <Col lg="12">
              <div className="hero__content">
                <h1 className="hero__title">Your Next Adventure Awaits</h1>
              </div>
            </Col>
            <Col lg="12">
              <SearchBar />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Marketing Section */}
      <MarketingSection />

      {/* Featured Tours */}
      <section className="featured__tours">
        <Container>
          <Row className="text-center">
            <Col lg="12">
              <Subtitle subtitle={'Explore'} />
              <h2 className="featured__tour-title">Handpicked Destinations</h2>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;