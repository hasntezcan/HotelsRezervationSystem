// src/pages/NewPassword.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/login.css';
import { useTranslation } from 'react-i18next';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const NewPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const query = useQuery();
  const token = query.get('token');

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => window.scrollTo(0, 0), []);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (password.length < 6) {
      setError(t('Password must be at least 6 characters'));
      return;
    }
    if (password !== confirm) {
      setError(t('Passwords do not match'));
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      });
      const text = await res.text();
      if (!res.ok) throw new Error(text);
      setMessage(t('reset.new_success')); // örn: "Şifreniz başarıyla yenilendi."
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!token) {
    return (
      <Container className="mt-5">
        <p>{t('Invalid reset link')}</p>
      </Container>
    );
  }

  return (
    <section className="auth-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg="6">
            <div className="auth-card">
              <h2 className="auth-title">{t('Yeni Şifre Belirle')}</h2>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <input
                    type="password"
                    placeholder={t('Yeni şifre')}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <input
                    type="password"
                    placeholder={t('Şifreyi tekrar girin')}
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                  />
                </FormGroup>
                {error && <p className="error-text">{error}</p>}
                {message && <p className="success-text">{message}</p>}
                <Button type="submit" className="btn auth-btn w-100">
                  {t('Şifreyi Yenile')}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default NewPassword;
