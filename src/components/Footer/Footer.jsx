import React from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row>
          {/* Brand / Logo + Intro */}
          <Col lg="3" md="6" className="mb-4">
            <div className="footer__logo">
              <img src={logo} alt="Place2Stay" />
            </div>
            <p className="footer__text">
            Your gateway to unforgettable travel experiences. Discover and book the perfect place to stay, anywhere in the world.”
            </p>
            <div className="social__links d-flex align-items-center gap-3">
              <span><Link to="#"><i className="ri-youtube-line"></i></Link></span>
              <span><Link to="#"><i className="ri-github-fill"></i></Link></span>
              <span><Link to="#"><i className="ri-facebook-circle-line"></i></Link></span>
              <span><Link to="#"><i className="ri-instagram-line"></i></Link></span>
            </div>
          </Col>

          {/* Discover */}
          <Col lg="3" md="6" className="mb-4">
            <h5 className="footer__title">Discover</h5>
            <ListGroup className="footer__list">
              <ListGroupItem className="ps-0 border-0">
                <Link to="/home">Home</Link>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0">
                <Link to="/about">About</Link>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0">
                <Link to="/tours">Tours</Link>
              </ListGroupItem>
            </ListGroup>
          </Col>

          {/* Quick Links */}
          <Col lg="3" md="6" className="mb-4">
            <h5 className="footer__title">Quick Links</h5>
            <ListGroup className="footer__list">
              <ListGroupItem className="ps-0 border-0">
                <Link to="/contact">Contact Us</Link>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0">
                <Link to="/login">Login</Link>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0">
                <Link to="/register">Register</Link>
              </ListGroupItem>
            </ListGroup>
          </Col>

          {/* Contact */}
          <Col lg="3" md="6" className="mb-4">
            <h5 className="footer__title">Contact</h5>
            <ListGroup className="footer__list footer__contact">
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                <i className="ri-map-pin-line"></i>
                <span>Cibali, Kadir Has Cd, 34083 Fatih/İstanbul</span>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                <i className="ri-mail-line"></i>
                <span>plac2stay@gmail.com</span>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                <i className="ri-phone-fill"></i>
                <span>+90 555 465 2882</span>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>

        {/* Copyright */}
        <Row>
          <Col lg="12">
            <div className="footer__bottom text-center">
              <p className="mb-0">
                &copy; {year} Place2Stay. All rights reserved.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
