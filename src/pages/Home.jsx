import React, { useEffect, useState } from 'react';
import '../styles/home.css';
import { Container, Row, Col } from 'reactstrap';
import Subtitle from './../shared/subtitle';
import SearchBar from './../shared/SearchBar';
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList';
import MarketingSection from '../components/MarketingSection/MarketingSection';
import backGround from '../assets/images/bg.png'

// Import images from the folder
import image1 from '../assets/images/homePage/image1.jpg';
import image2 from '../assets/images/homePage/image2.jpg';
import image3 from '../assets/images/homePage/image3.jpg';
import image4 from '../assets/images/homePage/image4.jpg';
import image5 from '../assets/images/homePage/image5.jpg';
import image6 from '../assets/images/homePage/image6.jpg';
import image7 from '../assets/images/homePage/image7.jpg';


const Home = () => {
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Slideshow state
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use the imported images
  const images = [image1, image2, image3, image4, image5, image6, image7];

  // Automatically change images every 5 seconds with a fade effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <>
      {/* Hero Section */}
      <section className="hero__section">
        {/* Slideshow Container */}
        <div className="hero__slideshow">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className={index === currentIndex ? 'active' : ''}
            />
          ))}
        </div>

        {/* Hero Content */}
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