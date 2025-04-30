import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { NightsStay, LocalOffer, EventAvailable } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import '../MarketingSection/Marketing.css';

const MarketingSection = () => {
  const { t } = useTranslation();

  const marketingData = [
    {
      icon: <NightsStay fontSize="large" />,
      title: t('marketing.title1'),
    },
    {
      icon: <LocalOffer fontSize="large" />,
      title: t('marketing.title2'),
    },
    {
      icon: <EventAvailable fontSize="large" />,
      title: t('marketing.title3'),
    }
  ];

  return (
    <section className="marketing__section">
      <Container>
        <Row className="align-items-center">
          <Col lg="4">
            <h2 className="marketing__title">
              {t('marketing.heading')}
            </h2>
          </Col>

          <Col lg="8">
            <div className="marketing__features">
              {marketingData.map((item, index) => (
                <div key={index} className="marketing__item">
                  <div className="marketing__icon">{item.icon}</div>
                  <div className="marketing__content">
                    <h5 className="marketing__subtitle">{item.title}</h5>
                    <p className="marketing__text">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MarketingSection;
