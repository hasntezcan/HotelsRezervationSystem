import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import '../styles/thank-you.css'

const ThankYou = () => {
  return (
    <section className="thank-you-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg="8" md="10" className="text-center">
            <div className="thank-you-content">
              <div className="check-icon">
                <i className="ri-checkbox-circle-line"></i>
              </div>
              <h1 className="thank-you-title">Thank You</h1>
              <h3 className="thank-you-subtitle">Your room is rezerved</h3>
              <p className="thank-you-text">
                We appreciate your trust in us. A confirmation email has been
                sent to you. <br/>We look forward to providing an amazing experience!
              </p>

              <div className="btn-group-thank">
                <Link to="/profile/bookings" className="btn see-details-btn">
                  See Reservation Details
                </Link>
                <Link to="/home" className="btn home-btn">
                  Back To Home
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default ThankYou
