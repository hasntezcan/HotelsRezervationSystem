import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import ResetImage from '../assets/images/forget_password.png';
import { useTranslation } from 'react-i18next';

const ResetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!email.trim()) {
      setError(t('Invalid email address'));
      return;
    }
    try {
      const res = await fetch('http://localhost:8080/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const text = await res.text();
      if (!res.ok) throw new Error(text);
      setMessage(t('reset.success'));
    } catch (err) {
      setError(err.message || t('reset.errors.generic'));
    }
  };

  return (
    <section className="auth-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg="10">
            <div className="auth-card d-flex flex-wrap">
              <div className="auth-left">
                <div className="image-wrapper">
                  <img src={ResetImage} alt="hotel" className="hotel-img" />
                </div>
              </div>
              <div className="auth-right">
              <h2 className="auth-title" style={{ textAlign: 'center' }}>
  {t('Forget My Password')}
</h2>
                <p className="auth-subtitle" style={{ textAlign: 'center' }}>{t('Enter your email address and will send you instructions to reset your password')}</p>
                <Form noValidate onSubmit={handleSubmit}>
                  <FormGroup>
                    <input
                      type="email"
                      id="email"
                      placeholder={t('Please enter your email')}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="form-control"
                      required
                    />
                    {error && <p className="error-text">{error}</p>}
                    {message && <p className="success-text">{message}</p>}
                  </FormGroup>
                  <Button type="submit" className="btn auth-btn w-100">
                    {t('Forgot Password')}
                  </Button>
                </Form>
                <p className="auth-footer" style={{ marginTop: '1rem' }}>
                  <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/login')}>
                    {t('Login')}
                  </span>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ResetPassword;
