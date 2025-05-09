import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/LanguageSelector.css';

const flagMap = {
  en: '/flags/en.png',
  tr: '/flags/tr.png'
};

const LanguageSelector = ({ isSidebarOpen }) => {
  const { i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('selectedLanguage', lng);
    localStorage.setItem('i18nextLng', lng);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang) i18n.changeLanguage(savedLang);
  }, [i18n]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className={`language-dropdown-sidebar ${!isSidebarOpen ? 'sidebar-closed' : ''}`}
      ref={dropdownRef}
    >
      <button
        className={`dropdown-toggle-sidebar ${!isSidebarOpen ? 'hide-arrow' : ''}`}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <img
          src={flagMap[i18n.language]}
          alt={i18n.language}
          className="flag-icon-sidebar"
        />
        {isSidebarOpen && (
          <span className="dropdown-label">
            {i18n.language === 'tr' ? 'Türkçe' : 'English'}
          </span>
        )}
      </button>

      {dropdownOpen && (
        <ul className={`dropdown-menu-lang-sidebar ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
          <li onClick={() => changeLanguage('en')}>
            <img src="/flags/en.png" alt="EN" className="flag-icon-sidebar" />
            {isSidebarOpen && <span className="menu-label">English</span>}
          </li>
          <li onClick={() => changeLanguage('tr')}>
            <img src="/flags/tr.png" alt="TR" className="flag-icon-sidebar" />
            {isSidebarOpen && <span className="menu-label">Türkçe</span>}
          </li>
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
