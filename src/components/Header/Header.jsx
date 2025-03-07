import React, { useEffect, useRef, useContext } from 'react'
import { Container, Row, Button } from 'reactstrap'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/images/logo.png'
import './header.css'
import { AuthContext } from '../../context/AuthContext'

/** 
 * Her menü öğesine ikon eklemek için
 * remixicon vb. ikon kütüphanesi kullanıyoruz.
 * Örnek: "ri-home-2-line", "ri-information-line", vb.
 */
const nav__links = [
  { path: '/home', display: 'Home', icon: 'ri-home-2-line' },
  { path: '/about', display: 'About', icon: 'ri-information-line' },
  { path: '/hotels', display: 'Hotels', icon: 'ri-hotel-line' },
  { path: '/contact', display: 'Contact ', icon: 'ri-contacts-line' },
]

const Header = () => {
  const headerRef = useRef(null)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const { user, dispatch } = useContext(AuthContext)

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/')
  }

  // Sticky effect
  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        headerRef.current.classList.add('sticky__header')
      } else {
        headerRef.current.classList.remove('sticky__header')
      }
    })
  }

  useEffect(() => {
    stickyHeaderFunc()
    return () => window.removeEventListener('scroll', stickyHeaderFunc)
  }, [])

  // Menü aç/kapa (mobil)
  const toggleMenu = () => {
    menuRef.current.classList.toggle('show__menu')
  }

  // Aynı sayfadaysak scrollTop'a git
  const handleNavClick = path => {
    if (window.location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            
            {/* LOGO (sol) */}
            <div className="logo">
              <img src={Logo} alt="Stay Inn" />
            </div>

            {/* NAVIGATION (orta) */}
            <div className="navigation" ref={menuRef}>
              {/* Kapatma butonu (X) -> Sadece mobilde görünür */}
              <span className="close__menu" onClick={toggleMenu}>
                &times;
              </span>

              <ul className="menu d-flex align-items-center gap-4">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={navClass =>
                        navClass.isActive ? 'active__link' : ''
                      }
                      onClick={() => {
                        handleNavClick(item.path)
                        toggleMenu() // tıklayınca mobil menü kapansın
                      }}
                    >
                      <i className={`${item.icon} nav__icon`}></i>
                      <span>{item.display}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* SAĞ KISIM (Login/Register veya Kullanıcı) */}
            <div className="nav__right d-flex align-items-center gap-3">
              <div className="nav__btns d-flex align-items-center gap-2">
                {user ? (
                  <div className="user-dropdown">
                    <h6 className="mb-0 user__name">{user.username}</h6>
                    <div className="dropdown-menu">
                      <Link to="/profile" className="dropdown-item">
                        Profile
                      </Link>
                      <button
                        className="dropdown-item logout-btn"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Button
                      className="secondary__btn"
                      onClick={() => navigate('/login')}
                    >
                      Login
                    </Button>
                    <Button
                      className="primary__btn"
                      onClick={() => navigate('/register')}
                    >
                      Register
                    </Button>
                  </>
                )}
              </div>

              {/* Mobile menu icon (hamburger) */}
              <span className="mobile__menu" onClick={toggleMenu}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  )
}

export default Header

/*
import React, { useEffect, useRef, useContext, useState } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import './header.css';
import { AuthContext } from '../../context/AuthContext';

const nav__links = [
  { path: '/home', display: 'Home' },
  { path: '/about', display: 'About' },
  { path: '/hotels', display: 'Hotels' },
  { path: '/contact', display: 'Contact ' },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  // Sticky effect
  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        headerRef.current.classList.add('sticky__header');
      } else {
        headerRef.current.classList.remove('sticky__header');
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener('scroll', stickyHeaderFunc);
  }, []);

  const toggleMenu = () => {
    menuRef.current.classList.toggle('show__menu');
  };

  // Smooth scroll to top if already on the same page
  const handleNavClick = (path) => {
    if (window.location.pathname === path) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            
            <div className="logo">
              <img src={Logo} alt="Stay Inn" />
            </div>

            <div className="navigation" ref={menuRef}>
              <ul className="menu d-flex align-items-center gap-4">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) => (navClass.isActive ? 'active__link' : '')}
                      onClick={() => handleNavClick(item.path)}
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__right d-flex align-items-center gap-3">
              <div className="nav__btns d-flex align-items-center gap-2">
                {user ? (
                  <div className="user-dropdown">
                    <h6 className="mb-0 user__name">{user.username}</h6>
                    <div className="dropdown-menu">
                      <Link to="/profile" className="dropdown-item">Profil</Link>
                      <button className="dropdown-item logout-btn" onClick={logout}>Çıkış Yap</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Button className="secondary__btn" onClick={() => navigate('/login')}>Login</Button>
                    <Button className="primary__btn" onClick={() => navigate('/register')}>Register</Button>
                  </>
                )}
              </div>

              <span className="mobile__menu" onClick={toggleMenu}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
*/