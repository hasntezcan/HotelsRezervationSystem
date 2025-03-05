import React, { useEffect } from 'react';
import '../styles/home.css';
import { Container, Row, Col } from 'reactstrap';
import Subtitle from './../shared/subtitle';
import SearchBar from './../shared/SearchBar';
import ServiceList from '../services/ServiceList';
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList';


const Home = () => {
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero__section">
        <Container>
          <Row className="align-items-center text-center">
            <Col lg="12">
              <div className="hero__content">
                <h1 className="hero__title">
                  Your Next Adventure <span className="highlight">Awaits</span>
                </h1>
              </div>
            </Col>
            <Col lg="12">
              <SearchBar />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section className="services__section">
        <Container>
          <Row className="text-center">
            <Col lg="12">
              <h5 className="services__subtitle">Our Services</h5>
              <h2 className="services__title">Premium Travel Experiences</h2>
            </Col>
          </Row>
          <Row>
            <Col lg="12" className="d-flex justify-content-center">
              <ServiceList />
            </Col>
          </Row>
        </Container>
      </section>


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