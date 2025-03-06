import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { NightsStay, LocalOffer, EventAvailable } from '@mui/icons-material'; // MUI Icons
import '../MarketingSection/Marketing.css';

const marketingData = [
  {
    icon: <NightsStay fontSize="large" />,
    title: 'Earn Rewards for Every Night',
    
  },
  {
    icon: <LocalOffer fontSize="large" />,
    title: 'Exclusive Member Discounts',
    
  },
  {
    icon: <EventAvailable fontSize="large" />,
    title: 'Flexible Cancellation Options',
    
  },
];

const MarketingSection = () => {
  return (
    <section className="marketing__section">
      <Container>
        <Row className="align-items-center">
          {/* Left Side - Text */}
          <Col lg="4">
            <h2 className="marketing__title">
              Find Your Perfect Stay & Book Instantly!
            </h2>
          </Col>

          {/* Right Side - Features */}
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
