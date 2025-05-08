import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import loginImg from '../assets/images/login.png';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.id]: '' }));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!credentials.email.trim()) {
      newErrors.email = t("login.errors.email_required");
    } else if (!/^\S+@\S+\.\S+$/.test(credentials.email.trim())) {
      newErrors.email = t("login.errors.email_invalid");
    }
    if (!credentials.password.trim()) {
      newErrors.password = t("login.errors.password_required");
    }
    return newErrors;
  };

  const handleClick = async e => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });

    const newErrors = validateFields();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Validation errors' });
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || t("login.errors.generic"));
      }
      const userData = await res.json();

      if (userData.user && userData.managerId) {
        localStorage.setItem("userId", userData.user.userId);
        alert(t("login.success.manager", {
          name: userData.user.username,
          id: userData.user.userId
        }));
      } else {
        localStorage.setItem("userId", userData.userId);
        alert(t("login.success.user", { name: userData.username }));
      }

      dispatch({ type: 'LOGIN_SUCCESS', payload: userData });

      if (userData.role?.toLowerCase() === 'admin') {
        navigate('/admin');
      } else if (userData.role?.toLowerCase() === 'manager') {
        navigate('/manager');
      } else {
        navigate('/');
      }
    } catch (err) {
      alert(err.message);
      dispatch({ type: 'LOGIN_FAILURE', payload: err.message });
    }
  };

  const goRegister = () => {
    navigate('/register');
  };

  return (
    <section className="auth-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg="10">
            <div className="auth-card d-flex flex-wrap">
              
              {/* Left Image */}
              <div className="auth-left">
                <div className="image-wrapper">
                  <img src={loginImg} alt="hotel" className="hotel-img" />
                </div>
              </div>
              
              {/* Right Form */}
              <div className="auth-right">
                <h2 className="auth-title">{t("login.title")}</h2>
                <p className="auth-subtitle">{t("login.subtitle")}</p>
                
                <Form noValidate onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="email"
                      id="email"
                      placeholder={t("login.placeholders.email")}
                      value={credentials.email}
                      onChange={handleChange}
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                  </FormGroup>
                  
                  <FormGroup>
                    <input
                      type="password"
                      id="password"
                      placeholder={t("login.placeholders.password")}
                      value={credentials.password}
                      onChange={handleChange}
                    />
                    {errors.password && <p className="error-text">{errors.password}</p>}
                  </FormGroup>
                  
                  <Button type="submit" className="btn auth-btn w-100">
                    {t("login.button")}
                  </Button>
                </Form>

                {/* Forgot Password Link */}
                <p className="auth-footer" style={{ marginTop: '0.5rem' }}>
                  <span
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => navigate('/reset-password')}
                  >
                    {t("Forget Password")}
                  </span>
                </p>
                
                {/* Register Link */}
                <p className="auth-footer" style={{ marginTop: '1rem' }}>
                  {t("login.no_account")}{' '}
                  <span
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={goRegister}
                  >
                    {t("login.register")}
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

export default Login;
