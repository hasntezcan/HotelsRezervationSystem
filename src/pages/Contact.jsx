import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import '../styles/contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Your message has been sent!');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section className="contact__section">
      <Container>
        <Row className="gy-4">
          <Col lg="6">
            <div className="map__container">
              <iframe
                title="location-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.0139351281478!2d28.95639361268239!3d41.02495107122876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9f12ab56e17%3A0x9485bbf687d7cbfd!2sKadir%20Has%20%C3%9Cniversitesi!5e0!3m2!1str!2str!4v1740860263820!5m2!1str!2str"
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
              <h2 className="mb-3">Get in Touch With Us</h2>
              <p className="contact__text">Get in touch with us, ask your questions,or share your thoughts.<br/> We’ll get back to you as soon as possible!</p>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        type="email"
                        id="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="phone">Phone</Label>
                      <Input
                        type="tel"
                        id="phone"
                        placeholder="Your Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="message">Message</Label>
                  <Input
                    type="textarea"
                    id="message"
                    rows="4"
                    placeholder="Write your message..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <Button type="submit" className="mt-3 btn primary__btn">
                  Send
                </Button>
              </Form>

              <div className="social__links mt-4">
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social__icon">
                  <i className="ri-twitter-line"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social__icon">
                  <i className="ri-instagram-line"></i>
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="social__icon">
                  <i className="ri-linkedin-box-line"></i>
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="social__icon">
                  <i className="ri-github-line"></i>
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;