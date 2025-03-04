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
            {/* LOGO */}
            <div className="logo">
              <img src={Logo} alt="Stay Inn" />
            </div>

            {/* NAV LINKS */}
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

              {/* Mobile menu icon */}
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