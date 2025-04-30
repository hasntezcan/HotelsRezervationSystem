import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/LanguageSelector.css'; // Kesin bu yol doğru olsun

const flagMap = {
  en: '/flags/en.png',
  tr: '/flags/tr.png'
};

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Dil değiştir
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('selectedLanguage', lng);
    localStorage.setItem('i18nextLng', lng);
    setDropdownOpen(false);
  };

  // Kaydetilmiş dili yükle
  useEffect(() => {
    const saved = localStorage.getItem('selectedLanguage');
    if (saved) i18n.changeLanguage(saved);
  }, [i18n]);

  // Dışarı tıklayınca menüyü kapat
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="language-dropdown-sidebar" ref={dropdownRef}>
      {/* Buton */}
      <button
        className="dropdown-toggle-sidebar"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <img
          src={flagMap[i18n.language]}
          alt={i18n.language}
          className="flag-icon-sidebar"
        />
        <span className="dropdown-label">
          {i18n.language === 'tr' ? 'Türkçe' : 'English'}
        </span>
      </button>

      {/* Dropdown */}
      {dropdownOpen && (
        <ul className="dropdown-menu-lang-sidebar">
          <li onClick={() => changeLanguage('en')}>
            <img src="/flags/en.png" alt="EN" className="flag-icon-sidebar" />
            <span className="menu-label">English</span>
          </li>
          <li onClick={() => changeLanguage('tr')}>
            <img src="/flags/tr.png" alt="TR" className="flag-icon-sidebar" />
            <span className="menu-label">Türkçe</span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
