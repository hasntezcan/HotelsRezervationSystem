// src/pages/NewPassword.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { useNavigate, useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const NewPassword = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const token = query.get('token');

  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(true);

  // Token geçerliliği kontrolü
  useEffect(() => {
    if (!token) return navigate('/login');
    fetch(`http://localhost:8080/api/auth/validate-reset-token?token=${token}`)
      .then(res => {
        if (!res.ok) throw new Error();
        setLoading(false);
      })
      .catch(() => navigate('/login'));
  }, [token, navigate]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalı.');
      return;
    }
    if (password !== confirm) {
      setError('Şifreler eşleşmiyor.');
      return;
    }

    const res = await fetch('http://localhost:8080/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password })
    });
    const text = await res.text();
    if (!res.ok) {
      setError(text);
      return;
    }

    // Başarılıysa alert göster ve login sayfasına yönlendir
    alert('Şifreniz başarıyla güncellendi. Lütfen yeni bilgilerinizle giriş yapın.');
    navigate('/login', { replace: true });
  };

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <section className="auth-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg="6">
            <div className="auth-card">
              <h2 className="auth-title">Yeni Şifre Belirle</h2>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <input
                    type="password"
                    placeholder="Yeni şifre"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <input
                    type="password"
                    placeholder="Şifreyi tekrar girin"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                  />
                </FormGroup>
                {error && <p className="error-text">{error}</p>}
                <Button type="submit" className="btn auth-btn w-100">
                  Şifreyi Yenile
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
