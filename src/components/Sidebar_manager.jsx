import "../styles/ManagerSideBar.css";
import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaTh, FaUserAlt, FaInfo, FaBars, FaSignOutAlt } from "react-icons/fa"; 
import { BiSolidHotel } from "react-icons/bi";
import logo from "../assets/images/SidebarLogo.png";
import { AuthContext } from "../../src/context/AuthContext";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";


const SidebarManager = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const [showLogo, setShowLogo] = useState(true);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const { t } = useTranslation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setShowLogo(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(false);
        setShowLogo(false);
      } else {
        setIsOpen(true);
        setShowLogo(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { path: "/manager", name: t("sidebar.dashboard"), icon: <FaTh /> },
    { path: "/manager/reservations", name: t("sidebar.reservations"), icon: <FaInfo /> },
    { path: "/manager/hotel", name: t("sidebar.hotel"), icon: <BiSolidHotel /> },
    { path: "/manager/profile", name: t("sidebar.profile"), icon: <FaUserAlt /> },
  ];

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    sessionStorage.clear();
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    fetch("/api/logout", { method: "POST", credentials: "include" })
      .catch((err) => console.error("Logout API error:", err));

    navigate("/login");
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="top_section">
        {showLogo && <img src={logo} alt="Logo" className="logo" />}
        <div className="bars" onClick={toggleSidebar}>
          <FaBars />
        </div>
      </div>
      <div className="language-section">
        <LanguageSelector />
      </div>
      {menuItems.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          end
          className={({ isActive }) => (isActive ? "active link" : "link")}
        >
          <div className="icon">{item.icon}</div>
          {isOpen && <div className="link_text">{item.name}</div>}
        </NavLink>
      ))}
      <button className="logout-btn" onClick={handleLogout}>
        <FaSignOutAlt className="logout-icon" /> {isOpen && t("sidebar.logout")}
      </button>
    </div>
  );
};

export default SidebarManager;
