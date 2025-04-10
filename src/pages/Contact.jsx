import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import '../styles/contact.css';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  // Sayfa yüklendiğinde en üste git
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Form alanlarındaki değişiklikleri kaydeder
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Form gönderimi
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // messageId gönderilmesine gerek yok, ID auto-increment
      const response = await axios.post("http://localhost:8080/api/contact", formData);
      console.log('Saved Message:', response.data);

      alert('Your message has been sent!');
      // Formu sıfırla
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message. Please try again.');
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
              <h2 className="mb-3">Get in Touch With Us</h2>
              <p className="contact__text">
                Get in touch with us, ask your questions, or share your thoughts.<br/>
                We’ll get back to you as soon as possible!
              </p>
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
                {/* Sosyal medya linkleriniz */}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
