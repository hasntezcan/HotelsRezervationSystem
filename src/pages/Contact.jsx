import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import '../styles/contact.css';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/contact", formData);
      console.log('Saved Message:', response.data);
      alert(t('contact_page.success'));
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      alert(t('contact.error'));
    }
  };

  return (
    <section className="contact__section">
      <Container>
        <Row className="gy-4">
          <Col lg="6">
            <div className="map__container">
              <iframe
                title="location-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.01393512269!2d28.956398975899262!3d41.02495107134817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9f12ab56e17%3A0x9485bbf687d7cbfd!2sKadir%20Has%20%C3%9Cniversitesi!5e0!3m2!1str!2str!4v1744282302041!5m2!1str!2str"
                width="100%"
                height="550"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Col>

          <Col lg="6">
            <div className="contact__form">
              <h2 className="mb-3">{t('contact_page.title')}</h2>
              <p className="contact__text">{t('contact_page.description')}</p>

              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="name">{t('contact_page.name')}</Label>
                  <Input
                    type="text"
                    id="name"
                    placeholder={t('contact_page.name_placeholder')}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="email">{t('contact_page.email')}</Label>
                      <Input
                        type="email"
                        id="email"
                        placeholder={t('contact_page.email_placeholder')}
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="phone">{t('contact_page.phone')}</Label>
                      <Input
                        type="tel"
                        id="phone"
                        placeholder={t('contact_page.phone_placeholder')}
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="message">{t('contact_page.message')}</Label>
                  <Input
                    type="textarea"
                    id="message"
                    rows="4"
                    placeholder={t('contact_page.message_placeholder')}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <Button type="submit" className="mt-3 btn primary__btn">
                  {t('contact_page.send')}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
