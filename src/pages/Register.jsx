import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import registerImg from '../assets/images/login.png';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
    setErrors((prev) => ({
      ...prev,
      [e.target.id]: ''
    }));
  };

  const validateFields = () => {
    const newErrors = {};

    if (!credentials.username.trim()) newErrors.username = t('register.errors.username');
    if (!credentials.first_name.trim()) newErrors.first_name = t('register.errors.first_name');
    if (!credentials.last_name.trim()) newErrors.last_name = t('register.errors.last_name');
    if (!credentials.phone.trim()) newErrors.phone = t('register.errors.phone');

    if (!credentials.email.trim()) {
      newErrors.email = t('register.errors.email_required');
    } else {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(credentials.email.trim())) {
        newErrors.email = t('register.errors.email_invalid');
      }
    }

    if (!credentials.password.trim()) {
      newErrors.password = t('register.errors.password_required');
    } else if (credentials.password.length < 6) {
      newErrors.password = t('register.errors.password_length');
    }

    return newErrors;
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch({ type: 'REGISTER_START' });

    try {
      const res = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...credentials, role: 'user' })
      });

      if (res.status === 409) {
        alert(t('register.errors.duplicate_email'));
        dispatch({ type: 'REGISTER_FAILURE', payload: 'Email already exists' });
        return;
      }

      if (!res.ok) throw new Error('Registration failed.');

      dispatch({ type: 'REGISTER_SUCCESS' });
      alert(t('register.success'));
      navigate('/login');
    } catch (err) {
      dispatch({ type: 'REGISTER_FAILURE', payload: err.message });
      alert(t('register.errors.generic'));
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
                  <img src={registerImg} alt="hotel" className="hotel-img" />
                </div>
              </div>

              <div className="auth-right">
                <h2 className="auth-title">{t('register.title')}</h2>
                <p className="auth-subtitle">{t('register.subtitle')}</p>

                <Form noValidate onSubmit={handleClick}>
                  {[
                    ['username', 'text'],
                    ['first_name', 'text'],
                    ['last_name', 'text'],
                    ['phone', 'text'],
                    ['email', 'email'],
                    ['password', 'password']
                  ].map(([field, type]) => (
                    <FormGroup key={field}>
                      <input
                        type={type}
                        id={field}
                        placeholder={t(`register.placeholders.${field}`)}
                        value={credentials[field]}
                        onChange={handleChange}
                      />
                      {errors[field] && <p className="error-text">{errors[field]}</p>}
                    </FormGroup>
                  ))}

                  <Button type="submit" className="btn auth-btn w-100">
                    {t('register.button')}
                  </Button>
                </Form>

                <p className="auth-footer" style={{ marginTop: '1rem' }}>
                  {t('register.have_account')}{' '}
                  <span
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => navigate('/login')}
                  >
                    {t('register.login')}
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

export default Register;
