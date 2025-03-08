import React, { useEffect, useRef, useContext } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import './header.css';
import { AuthContext } from '../../context/AuthContext';

const nav__links = [
  { path: '/home', display: 'Home', icon: 'ri-home-2-line' },
  { path: '/about', display: 'About', icon: 'ri-information-line' },
  { path: '/hotels', display: 'Hotels', icon: 'ri-hotel-line' },
  { path: '/contact', display: 'Contact', icon: 'ri-contacts-line' },
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

  // Toggle menu (mobile)
  const toggleMenu = () => {
    menuRef.current.classList.toggle('show__menu');
  };

  // Scroll to top if already on the same page
  const handleNavClick = (path) => {
    if (window.location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            {/* Logo */}
            <div className="logo">
              <img src={Logo} alt="Stay Inn" />
            </div>

            {/* Navigation */}
            <div className="navigation" ref={menuRef}>
              <span className="close__menu" onClick={toggleMenu}>
                &times;
              </span>

              <ul className="menu d-flex align-items-center gap-4">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? 'active__link' : ''
                      }
                      onClick={() => {
                        handleNavClick(item.path);
                        toggleMenu();
                      }}
                    >
                      <i className={`${item.icon} nav__icon`}></i>
                      <span>{item.display}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Section (Login/Register or User) */}
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
  );
};

export default Header;