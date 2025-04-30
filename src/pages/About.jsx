import React, { useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import '../styles/about.css';

import hasanImg from '../assets/images/hasan.jpg';
import emirImg from '../assets/images/emir.jpg';
import sezaiImg from '../assets/images/sezai.jpg';
import dedeImg from '../assets/images/dede.jpg';

const About = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="about__section">
      <Container>
        <Row>
          <Col lg="12">
            <div className="about__header text-center">
              <h2>{t('about.title')}</h2>
              <p>{t('about.description')}</p>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg="3" md="4" sm="6" xs="6">
            <div className="team__member">
              <img src={hasanImg} alt="Hasan" className="team__member-img" />
              <h5 className="team__member-name">Hasan Tezcan</h5>
              <p className="team__member-role">{t('about.roles.fullstack')}</p>
              <div className="team__member-links">
                <a href="https://www.linkedin.com/in/hasan-tezcan0/" target="_blank" rel="noreferrer" className="social-link">
                  <i className="ri-linkedin-box-fill"></i>
                </a>
                <a href="https://github.com/hasntezcan" target="_blank" rel="noreferrer" className="social-link">
                  <i className="ri-github-fill"></i>
                </a>
              </div>
            </div>
          </Col>

          <Col lg="3" md="4" sm="6" xs="6">
            <div className="team__member">
              <img src={emirImg} alt="Emir" className="team__member-img" />
              <h5 className="team__member-name">Emir Esad Şahin</h5>
              <p className="team__member-role">{t('about.roles.backend')}</p>
              <div className="team__member-links">
                <a href="https://www.linkedin.com/in/emir%C5%9Fahin/" target="_blank" rel="noreferrer" className="social-link">
                  <i className="ri-linkedin-box-fill"></i>
                </a>
                <a href="https://github.com/iamsahinemir" target="_blank" rel="noreferrer" className="social-link">
                  <i className="ri-github-fill"></i>
                </a>
              </div>
            </div>
          </Col>

          <Col lg="3" md="4" sm="6" xs="6">
            <div className="team__member">
              <img src={sezaiImg} alt="Sezai" className="team__member-img" />
              <h5 className="team__member-name">Sezai Araplarlı</h5>
              <p className="team__member-role">{t('about.roles.frontend')}</p>
              <div className="team__member-links">
                <a href="https://www.linkedin.com/in/sezowastaken" target="_blank" rel="noreferrer" className="social-link">
                  <i className="ri-linkedin-box-fill"></i>
                </a>
                <a href="https://github.com/sezowastaken" target="_blank" rel="noreferrer" className="social-link">
                  <i className="ri-github-fill"></i>
                </a>
              </div>
            </div>
          </Col>

          <Col lg="3" md="4" sm="6" xs="6">
            <div className="team__member">
              <img src={dedeImg} alt="Dede" className="team__member-img" />
              <h5 className="team__member-name">Tunahan Tuze</h5>
              <p className="team__member-role">{t('about.roles.design')}</p>
              <div className="team__member-links">
                <a href="https://www.linkedin.com/in/tunahantuze/" target="_blank" rel="noreferrer" className="social-link">
                  <i className="ri-linkedin-box-fill"></i>
                </a>
                <a href="https://github.com/TunahanTuze" target="_blank" rel="noreferrer" className="social-link">
                  <i className="ri-github-fill"></i>
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
