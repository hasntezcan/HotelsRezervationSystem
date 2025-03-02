import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import '../styles/about.css'

import hasanImg from '../assets/images/hasan.jpg'
import emirImg from '../assets/images/emir.jpg'
import sezaiImg from '../assets/images/sezai.jpg'
import dedeImg from '../assets/images/dede.jpg'

const About = () => {
  return (
    <section className="about__section">
      <Container>
        <Row>
          <Col lg="12">
            <div className="about__header text-center">
              <h2>About Us</h2>
              <p>
                This project is built by four passionate developers studying at Kadir Has University
                aiming to provide every convenience a traveler might desire.
                From exploring exotic tours to booking the perfect accommodation —
                we strive to make every journey memorable.
              </p>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center">

          <Col lg="3" md="4" sm="6" xs="6">
            <div className="team__member">
              <img src={hasanImg} alt="Hasan" className="team__member-img" />
              <h5 className="team__member-name">Hasan Tezcan</h5>
              <p className="team__member-role">Full Stack Developer</p>

              <div className="team__member-links">
                <a 
                  href="https://www.linkedin.com/in/hasntezcan" 
                  target="_blank" 
                  rel="noreferrer"
                  className="social-link"
                >
                  <i className="ri-linkedin-box-fill"></i>
                </a>
                <a 
                  href="https://github.com/hasntezcan" 
                  target="_blank" 
                  rel="noreferrer"
                  className="social-link"
                >
                  <i className="ri-github-fill"></i>
                </a>
              </div>
            </div>
          </Col>

          <Col lg="3" md="4" sm="6" xs="6">
            <div className="team__member">
              <img src={emirImg} alt="Emir" className="team__member-img" />
              <h5 className="team__member-name">Emir Esad Şahin</h5>
              <p className="team__member-role">Frontend Developer</p>

              <div className="team__member-links">
                <a 
                  href="https://www.linkedin.com/in/emir%C5%9Fahin/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="social-link"
                >
                  <i className="ri-linkedin-box-fill"></i>
                </a>
                <a 
                  href="https://github.com/iamsahinemir" 
                  target="_blank" 
                  rel="noreferrer"
                  className="social-link"
                >
                  <i className="ri-github-fill"></i>
                </a>
              </div>
            </div>
          </Col>

          <Col lg="3" md="4" sm="6" xs="6">
            <div className="team__member">
              <img src={sezaiImg} alt="Sezai" className="team__member-img" />
              <h5 className="team__member-name">Sezai Araplarlı</h5>
              <p className="team__member-role">Backend Developer</p>

              <div className="team__member-links">
                <a 
                  href="https://www.linkedin.com/in/sezaiaraplarli" 
                  target="_blank" 
                  rel="noreferrer"
                  className="social-link"
                >
                  <i className="ri-linkedin-box-fill"></i>
                </a>
                <a 
                  href="https://github.com/sezowastaken" 
                  target="_blank" 
                  rel="noreferrer"
                  className="social-link"
                >
                  <i className="ri-github-fill"></i>
                </a>
              </div>
            </div>
          </Col>

          {/* 4) Dede */}
          <Col lg="3" md="4" sm="6" xs="6">
            <div className="team__member">
              <img src={dedeImg} alt="Dede" className="team__member-img" />
              <h5 className="team__member-name">Tunahan Tuze</h5>
              <p className="team__member-role">Design / UX</p>

              <div className="team__member-links">
                <a 
                  href="https://www.linkedin.com/in/tunahantuze" 
                  target="_blank" 
                  rel="noreferrer"
                  className="social-link"
                >
                  <i className="ri-linkedin-box-fill"></i>
                </a>
                <a 
                  href="https://github.com/TunahanTuze" 
                  target="_blank" 
                  rel="noreferrer"
                  className="social-link"
                >
                  <i className="ri-github-fill"></i>
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default About
