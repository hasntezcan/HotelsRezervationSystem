import React, { useState, useContext } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/login.css'
import registerImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
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

    // 1) Local Storage'da "localUsers" key'ini okuyalım. Yoksa boş array.
    let users = JSON.parse(localStorage.getItem('localUsers')) || []

    // 2) Aynı email var mı kontrol edelim.
    const emailExists = users.some(user => user.email === credentials.email)
    if(emailExists){
      alert('This email is already registered!')
      return
    }

    // 3) Yeni kullanıcıyı ekleyip tekrar localStorage'e yazalım.
    const newUser = {
      id: Date.now(), // basit bir uniq ID
      username: credentials.username,
      email: credentials.email,
      password: credentials.password
    }

    users.push(newUser)
    localStorage.setItem('localUsers', JSON.stringify(users))

    // 4) AuthContext'e "REGISTER_SUCCESS" dispatch edelim, login'e yönlendirelim
    dispatch({ type: 'REGISTER_SUCCESS' })
    alert('Registered successfully! Please login.')
    navigate('/login')
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={registerImg} alt="register" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="user" />
                </div>
                <h2>Register</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Username"
                      id="username"
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      id="email"
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      id="password"
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <Button className="btn secondary__btn auth__btn" type="submit">
                    Create Account
                  </Button>
                </Form>

                <p>
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

/*
import React, { useState, useContext } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import registerImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'

const Register = () => {
   const [credentials, setCredentials] = useState({
      userName: undefined,
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

      try {
         const res = await fetch(`${BASE_URL}/auth/register`, {
            method:'post',
            headers: {
               'content-type':'application/json'
            },
            body: JSON.stringify(credentials)
         })
         const result = await res.json()

         if(!res.ok) alert(result.message)

         dispatch({type:'REGISTER_SUCCESS'})
         navigate('/login')
      } catch(err) {
         alert(err.message)
      }
   }

   return (
      <section>
         <Container>
            <Row>
               <Col lg='8' className='m-auto'>
                  <div className="login__container d-flex justify-content-between">
                     <div className="login__img">
                        <img src={registerImg} alt="" />
                     </div>

                     <div className="login__form">
                        <div className="user">
                           <img src={userIcon} alt="" />
                        </div>
                        <h2>Register</h2>

                        <Form onSubmit={handleClick}>
                           <FormGroup>
                              <input type="text" placeholder='Username' id='username' onChange={handleChange} required />
                           </FormGroup>
                           <FormGroup>
                              <input type="email" placeholder='Email' id='email' onChange={handleChange} required />
                           </FormGroup>
                           <FormGroup>
                              <input type="password" placeholder='Password' id='password' onChange={handleChange} required />
                           </FormGroup>
                           <Button className='btn secondary__btn auth__btn' type='submit'>Create Account</Button>
                        </Form>
                        <p>Already have an account? <Link to='/login'>Login</Link></p>
                     </div>
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default Register
*/