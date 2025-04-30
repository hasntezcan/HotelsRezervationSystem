import React, { useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/thank-you.css';
import { useTranslation } from 'react-i18next';

const ThankYou = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="thank-you-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg="8" md="10" className="text-center">
            <div className="thank-you-content">
              <div className="check-icon">
                <i className="ri-checkbox-circle-line"></i>
              </div>
              <h1 className="thank-you-title">{t('thank_you.title')}</h1>
              <h3 className="thank-you-subtitle">{t('thank_you.subtitle')}</h3>
              <p className="thank-you-text">
                {t('thank_you.description')}
              </p>

              <div className="btn-group-thank">
                <Link to="/profile/bookings" className="btn see-details-btn">
                  {t('thank_you.details')}
                </Link>
                <Link to="/home" className="btn home-btn">
                  {t('thank_you.home')}
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ThankYou;
