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

  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: ''
  })

  const [errors, setErrors] = useState({})
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
    setErrors((prev) => ({
      ...prev,
      [e.target.id]: ''
    }))
  }

  const validateFields = () => {
    const newErrors = {}

    if (!credentials.username.trim()) newErrors.username = 'Username is required.'
    if (!credentials.first_name.trim()) newErrors.first_name = 'First name is required.'
    if (!credentials.last_name.trim()) newErrors.last_name = 'Last name is required.'
    if (!credentials.phone.trim()) newErrors.phone = 'Phone number is required.'

    if (!credentials.email.trim()) {
      newErrors.email = 'Email is required.'
    } else {
      const emailRegex = /^\S+@\S+\.\S+$/
      if (!emailRegex.test(credentials.email.trim())) {
        newErrors.email = 'Invalid email address.'
      }
    }

    if (!credentials.password.trim()) {
      newErrors.password = 'Password is required.'
    } else if (credentials.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.'
    }

    return newErrors
  }

  const handleClick = async (e) => {
    e.preventDefault()

    const newErrors = validateFields()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    dispatch({ type: 'REGISTER_START' })

    try {
      const res = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...credentials,
          role: 'user'
        })
      })

      if (res.status === 409) {
        alert('Email already exists.')
        dispatch({ type: 'REGISTER_FAILURE', payload: 'Email already exists' })
        return
      }

      if (!res.ok) {
        throw new Error('Registration failed.')
      }

      dispatch({ type: 'REGISTER_SUCCESS' })
      alert('Account created! You can now log in.')
      navigate('/login')
    } catch (err) {
      dispatch({ type: 'REGISTER_FAILURE', payload: err.message })
      alert('Something went wrong. Please try again.')
    }
  }

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
                <h2 className="auth-title">Join Us</h2>
                <p className="auth-subtitle">Start your booking adventure!</p>

                <Form noValidate onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="text"
                      id="username"
                      placeholder="Username"
                      value={credentials.username}
                      onChange={handleChange}
                    />
                    {errors.username && <p className="error-text">{errors.username}</p>}
                  </FormGroup>

                  <FormGroup>
                    <input
                      type="text"
                      id="first_name"
                      placeholder="First Name"
                      value={credentials.first_name}
                      onChange={handleChange}
                    />
                    {errors.first_name && <p className="error-text">{errors.first_name}</p>}
                  </FormGroup>

                  <FormGroup>
                    <input
                      type="text"
                      id="last_name"
                      placeholder="Last Name"
                      value={credentials.last_name}
                      onChange={handleChange}
                    />
                    {errors.last_name && <p className="error-text">{errors.last_name}</p>}
                  </FormGroup>

                  <FormGroup>
                    <input
                      type="text"
                      id="phone"
                      placeholder="Phone Number"
                      value={credentials.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && <p className="error-text">{errors.phone}</p>}
                  </FormGroup>

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
                    {errors.password && <p className="error-text">{errors.password}</p>}
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
