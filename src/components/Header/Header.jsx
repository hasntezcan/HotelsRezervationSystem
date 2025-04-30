import React, { useEffect, useRef, useContext, useState } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../../assets/images/logo.png';
import './header.css';
import { AuthContext } from '../../context/AuthContext';

const nav__links = [
  { path: '/home', key: 'home', icon: 'ri-home-2-line' },
  { path: '/about', key: 'about_button', icon: 'ri-information-line' },
  { path: '/hotels', key: 'hotels', icon: 'ri-hotel-line' },
  { path: '/contact', key: 'contact', icon: 'ri-contacts-line' },
];

const flagMap = {
  en: '/flags/en.png',
  tr: '/flags/tr.png'
};

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

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

  // Click outside dropdown to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    menuRef.current.classList.toggle('show__menu');
  };

  const handleNavClick = (path) => {
    if (window.location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setDropdownOpen(false);
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
                      <span>{t(item.key)}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__right d-flex align-items-center gap-3">
              {/* Dil Seçici */}
              <div className="language-dropdown" ref={dropdownRef}>
                <button
                  className="dropdown-toggle"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <img
                    src={flagMap[i18n.language]}
                    alt={i18n.language}
                    className="flag-icon"
                  />
                  {i18n.language === 'tr' ? 'Türkçe' : 'English'}
                </button>
                {dropdownOpen && (
                  <ul className="dropdown-menu-lang">
                    <li onClick={() => changeLanguage('en')}>
                      <img src="/flags/en.png" alt="EN" />
                      English
                    </li>
                    <li onClick={() => changeLanguage('tr')}>
                      <img src="/flags/tr.png" alt="TR" />
                      Türkçe
                    </li>
                  </ul>
                )}
              </div>

              <div className="nav__btns d-flex align-items-center gap-2">
                <span className="mobile__menu" onClick={toggleMenu}>
                  <i className="ri-menu-line"></i>
                </span>
                {user ? (
                  <div className="user-dropdown">
                    <h6 className="mb-0 user__name">{user.username}</h6>
                    <div className="dropdown-menu">
                      <Link to="/profile" className="dropdown-item">
                        Profile
                      </Link>
                      <button className="dropdown-item logout-btn" onClick={logout}>
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Button className="secondary__btn" onClick={() => navigate('/login')}>
                      {t('login_button')}
                    </Button>
                    <Button className="primary__btn" onClick={() => navigate('/register')}>
                      {t('register_button')}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
