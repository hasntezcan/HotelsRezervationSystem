import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import loginImg from '../assets/images/login.png';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let users = JSON.parse(localStorage.getItem('localUsers')) || [];

    const defaultUsers = [
      {
        id: 1,
        username: 'Admin1',
        email: 'admin@gmail.com',
        password: 'admin123',
        role: 'admin',
      },
      {
        id: 2,
        username: 'Manager1',
        email: 'manager@gmail.com',
        password: 'manager123',
        role: 'manager',
      },
      {
        id: 3,
        username: 'User1',
        email: 'user@gmail.com',
        password: 'user123',
        role: 'user',
      },
    ];

    let updated = false;
    defaultUsers.forEach((defUser) => {
      if (!users.some((u) => u.email === defUser.email)) {
        users.push(defUser);
        updated = true;
      }
    });

    if (updated) {
      localStorage.setItem('localUsers', JSON.stringify(users));
    }
  }, []);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.id]: '' }));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!credentials.email.trim()) {
      newErrors.email = 'Email is required.';
    } else {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(credentials.email.trim())) {
        newErrors.email = 'Please enter a valid email.';
      }
    }
    if (!credentials.password.trim()) {
      newErrors.password = 'Password is required.';
    }
    return newErrors;
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });

    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Validation errors' });
      return;
    }

    let users = JSON.parse(localStorage.getItem('localUsers')) || [];
    const foundUser = users.find(
      (u) =>
        u.email.trim().toLowerCase() === credentials.email.trim().toLowerCase() &&
        u.password === credentials.password
    );

    if (!foundUser) {
      alert('Invalid email or password');
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Wrong credentials' });
      return;
    }

    dispatch({ type: 'LOGIN_SUCCESS', payload: foundUser });
    alert(`Welcome, ${foundUser.username}!`);

    if (foundUser.role === 'admin') {
      navigate('/admin');
    } else if (foundUser.role === 'manager') {
      navigate('/manager');
    } else {
      navigate('/');
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
              <div className="auth-left">
                <div className="image-wrapper">
                  <img src={loginImg} alt="hotel" className="hotel-img" />
                </div>
              </div>

              <div className="auth-right">
                <h2 className="auth-title">Hello Stay Inn User</h2>
                <p className="auth-subtitle">Welcome back! Please log in.</p>

                <Form noValidate onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="email"
                      id="email"
                      placeholder="Email"
                      value={credentials.email}
                      onChange={handleChange}
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                  </FormGroup>

                  <FormGroup>
                    <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      value={credentials.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <p className="error-text">{errors.password}</p>
                    )}
                  </FormGroup>

                  <Button type="submit" className="btn auth-btn w-100">
                    LOGIN
                  </Button>
                </Form>

                <p className="auth-footer" style={{ marginTop: '1rem' }}>
                  Don&apos;t have an account?{' '}
                  <span
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={goRegister}
                  >
                    Create now
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