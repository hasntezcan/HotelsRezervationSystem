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
              Your gateway to unforgettable travel experiences. Discover and book the perfect place to stay, anywhere in the world.
            </p>
            <div className="social__links d-flex align-items-center gap-3">
              <span><Link to="#"><i className="ri-youtube-line"></i></Link></span>
              <span><Link to="#"><i className="ri-github-fill"></i></Link></span>
              <span><Link to="#"><i className="ri-facebook-circle-line"></i></Link></span>
              <span><Link to="#"><i className="ri-instagram-line"></i></Link></span>
            </div>
          </Col>

          {/* Spacer Column (Replaces Discover and Quick Links) */}
          <Col lg="6" md="6" className="mb-4">
            {/* Empty column to maintain layout */}
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
                <span>stayinn@contact.com</span>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                <i className="ri-phone-fill"></i>
                <span>+90 212 935 4427</span>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>

        {/* Copyright */}
        <Row>
          <Col lg="12">
            <div className="footer__bottom text-center">
              <p className="mb-0">
                &copy; {year} Stay Inn. All rights reserved.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;