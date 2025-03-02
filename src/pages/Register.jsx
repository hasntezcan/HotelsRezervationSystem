// src/pages/Register.jsx

import React, { useState, useContext } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/login.css'
import registerImg from '../assets/images/login.png'
import hotelImage from '../assets/images/hotelIllustration.png'
import { AuthContext } from '../context/AuthContext'

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: ''
  })
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = e => {
    e.preventDefault()

    let users = JSON.parse(localStorage.getItem('localUsers')) || []
    const emailExists = users.some(user => user.email === credentials.email)
    if (emailExists) {
      alert('This email is already registered!')
      return
    }

    const newUser = {
      id: Date.now(),
      username: credentials.username,
      email: credentials.email,
      password: credentials.password
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
              
              {/* Sol kısım */}
              <div className="auth-left">
                <div className="image-wrapper">
                  <img src={registerImg} alt="hotel" className="hotel-img" />
                </div>
              </div>
              
              {/* Sağ kısım */}
              <div className="auth-right">
                <h2 className="auth-title">Join Us</h2>
                <p className="auth-subtitle">
                Start your booking adventure! All your travel needs in one place.
                </p>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="text"
                      id="username"
                      placeholder="Username"
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="email"
                      id="email"
                      placeholder="Email"
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <Button type="submit" className="btn auth-btn w-100">
                    CREATE ACCOUNT
                  </Button>
                </Form>

                <p className="auth-footer">
                Already have an account? <Link to="/login">Login</Link>
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
