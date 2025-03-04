// src/pages/Login.jsx

import React, { useContext, useState } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/login.css'
import loginImg from '../assets/images/login.png'

// Yeni illüstrasyon veya görsel (PNG/SVG)
import hotelImage from '../assets/images/hotelIllustration.png'

import { AuthContext } from '../context/AuthContext'

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = e => {
    e.preventDefault()
    dispatch({ type: 'LOGIN_START' })

    let users = JSON.parse(localStorage.getItem('localUsers')) || []
    const foundUser = users.find(
      u => u.email === credentials.email && u.password === credentials.password
    )
    if (!foundUser) {
      alert('Invalid email or password')
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Wrong credentials' })
      return
    }
    dispatch({ type: 'LOGIN_SUCCESS', payload: foundUser })
    alert(`Welcome, ${foundUser.username}!`)
    navigate('/')
  }

  return (
    <section className="auth-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg="10">
            
            {/* Kart benzeri wrap */}
            <div className="auth-card d-flex flex-wrap">
              
              {/* Sol kısım (görsel + dalgalı arkaplan) */}
              <div className="auth-left">
                <div className="image-wrapper">
                  <img src={loginImg} alt="hotel" className="hotel-img" />
                </div>
              </div>
              
              {/* Sağ kısım (form) */}
              <div className="auth-right">
                <h2 className="auth-title">Hello Stay Inn User</h2>
                <p className="auth-subtitle">Welcome back! Please log in.</p>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="email"
                      id="email"
                      placeholder="Email"
                      value={credentials.email}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      value={credentials.password}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <Button type="submit" className="btn auth-btn w-100">
                    LOGIN
                  </Button>
                </Form>

                <p className="auth-footer">
                Don't have an account? <Link to="/register">Create now</Link>
                </p>
              </div>

            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login


/*
import React, { useContext, useState } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import loginImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'

const Login = () => {
   const [credentials, setCredentials] = useState({
      email: undefined,
      password: undefined
   })

   const {dispatch} = useContext(AuthContext)
   const navigate = useNavigate()

   const handleChange = e => {
      setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
   }

   const handleClick = async e => {
      e.preventDefault()

      dispatch({type:'LOGIN_START'})

      try {
         const res = await fetch(`${BASE_URL}/auth/login`, {
            method:'post',
            headers: {
               'content-type':'application/json'
            },
            credentials:'include',
            body: JSON.stringify(credentials)
         })

         const result = await res.json()
         if(!res.ok) alert(result.message)
         console.log(result.data)

         dispatch({type:"LOGIN_SUCCESS", payload:result.data})
         navigate('/')
      } catch(err) {
         dispatch({type:"LOGIN_FAILURE", payload:err.message})
      }
   }

   return (
      <section>
         <Container>
            <Row>
               <Col lg='8' className='m-auto'>
                  <div className="login__container d-flex justify-content-between">
                     <div className="login__img">
                        <img src={loginImg} alt="" />
                     </div>

                     <div className="login__form">
                        <div className="user">
                           <img src={userIcon} alt="" />
                        </div>
                        <h2>Login</h2>

                        <Form onSubmit={handleClick}>
                           <FormGroup>
                              <input type="email" placeholder='Email' id='email' onChange={handleChange} required />
                           </FormGroup>
                           <FormGroup>
                              <input type="password" placeholder='Password' id='password' onChange={handleChange} required />
                           </FormGroup>
                           <Button className='btn secondary__btn auth__btn' type='submit'>Login</Button>
                        </Form>
                        <p>Don't have an account? <Link to='/register'>Create</Link></p>
                     </div>
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default Login

*/