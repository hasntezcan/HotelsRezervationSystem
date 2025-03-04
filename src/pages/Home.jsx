import React from 'react';
import '../styles/home.css';
import { Container, Row, Col } from 'reactstrap';
import heroImg from '../assets/images/hero-img01.jpg';
import worldImg from '../assets/images/world.png';
import experienceImg from '../assets/images/experience.png';

import Subtitle from './../shared/subtitle';
import SearchBar from './../shared/SearchBar';
import ServiceList from '../services/ServiceList';
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList';
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery';
import Testimonials from '../components/Testimonial/Testimonials';
import NewsLetter from '../shared/Newsletter';

const Home = () => {
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
                        {/*<p className="hero__text">*/}
                       {/* Discover the Future of Travel. Your journey starts here.*/}
                        {/*</p>*/}
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
                  <ServiceList />
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


         {/* Gallery Section */}
         <section className="gallery__section">
            <Container>
               <Row className="text-center">
                  <Col lg="12">
                     <Subtitle subtitle={'Gallery'} />
                     <h2 className="gallery__title">Memories from Our Travelers</h2>
                  </Col>
                  <Col lg="12">
                     <MasonryImagesGallery />
                  </Col>
               </Row>
            </Container>
         </section>

         {/* Testimonials Section */}
         <section className="testimonial__section">
            <Container>
               <Row className="text-center">
                  <Col lg="12">
                     <Subtitle subtitle={'Customer Stories'} />
                     <h2 className="testimonial__title">What Our Travelers Say</h2>
                  </Col>
                  <Col lg="12">
                     <Testimonials />
                  </Col>
               </Row>
            </Container>
         </section>

         {/* Newsletter */}
         <NewsLetter />
      </>
   );
};

export default Home;
