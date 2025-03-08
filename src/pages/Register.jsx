// src/pages/Register.jsx
import React, { useState, useContext, useEffect } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import '../styles/login.css'
import registerImg from '../assets/images/login.png'
import { AuthContext } from '../context/AuthContext'

const Register = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Form fields
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: ''
  })

  // For inline errors
  const [errors, setErrors] = useState({})

  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
    // Clear error for this field as user types
    setErrors((prev) => ({
      ...prev,
      [e.target.id]: ''
    }))
  }

  const validateFields = () => {
    const newErrors = {}

    // Username checks
    if (!credentials.username.trim()) {
      newErrors.username = 'Username is required.'
    } else if (credentials.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters.'
    }

    // Email checks
    if (!credentials.email.trim()) {
      newErrors.email = 'Email is required.'
    } else {
      // Basic regex for email
      const emailRegex = /^\S+@\S+\.\S+$/
      if (!emailRegex.test(credentials.email.trim())) {
        newErrors.email = 'Please enter a valid email.'
      }
    }

    // Password checks
    if (!credentials.password.trim()) {
      newErrors.password = 'Password is required.'
    } else if (credentials.password.trim().length < 6) {
      newErrors.password = 'Password must be at least 6 characters.'
    }

    return newErrors
  }

  const handleClick = (e) => {
    e.preventDefault()

    // 1) Validate form fields
    const newErrors = validateFields()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // 2) Check localUsers for existing email
    let users = JSON.parse(localStorage.getItem('localUsers')) || []
    const emailExists = users.some((user) => user.email === credentials.email)
    if (emailExists) {
      alert('This email is already registered!')
      return
    }

    // 3) Create new user
    const newUser = {
      id: Date.now(),
      username: credentials.username.trim(),
      email: credentials.email.trim(),
      password: credentials.password.trim(),
      role: 'user'
    }

    users.push(newUser)
    localStorage.setItem('localUsers', JSON.stringify(users))

    dispatch({ type: 'REGISTER_SUCCESS' })
    alert('Your account has been created, you can now log in!')
    navigate('/login')
  }

  return (
    <section className="auth-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg="10">
            <div className="auth-card d-flex flex-wrap">
              {/* Left side: image */}
              <div className="auth-left">
                <div className="image-wrapper">
                  <img src={registerImg} alt="hotel" className="hotel-img" />
                </div>
              </div>

              {/* Right side: form */}
              <div className="auth-right">
                <h2 className="auth-title">Join Us</h2>
                <p className="auth-subtitle">
                  Start your booking adventure! All your travel needs in one place.
                </p>

                {/*
                  noValidate => disables default HTML5 pop-ups
                  onSubmit => handleClick
                */}
                <Form noValidate onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="text"
                      id="username"
                      placeholder="Username"
                      value={credentials.username}
                      onChange={handleChange}
                    />
                    {/* Inline error message if any */}
                    {errors.username && (
                      <p className="error-text">{errors.username}</p>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <input
                      type="email"
                      id="email"
                      placeholder="Email"
                      value={credentials.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="error-text">{errors.email}</p>
                    )}
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
                    CREATE ACCOUNT
                  </Button>
                </Form>

                <p className="auth-footer" style={{ marginTop: '1rem' }}>
                  Already have an account?{' '}
                  <span
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </span>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Register
