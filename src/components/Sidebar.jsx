import "../styles/ManagerSideBar.css";
import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaTh, FaUserAlt, FaInfo, FaBars, FaSignOutAlt } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { BiSolidHotel } from "react-icons/bi";
import logo from "../assets/images/SidebarLogo.png";
import { AuthContext } from "../../src/context/AuthContext";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";


const Sidebar = () => {
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

  const menuItems = [
    { path: "/admin", name: t("admin_sidebar.dashboard"), icon: <FaTh /> },
    { path: "/admin/contactus", name: t("admin_sidebar.contact"), icon: <FaInfo /> },
    { path: "/admin/user", name: t("admin_sidebar.user"), icon: <BsFillPeopleFill /> },
    { path: "/admin/hotels", name: t("admin_sidebar.hotels"), icon: <BiSolidHotel /> },
    { path: "/admin/profile", name: t("admin_sidebar.profile"), icon: <FaUserAlt /> },
  ];

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="top_section">
        {showLogo && <img src={logo} alt="Logo" className="logo" />}
        <div className="bars" onClick={toggleSidebar}>
          <FaBars />
        </div>
      </div>
      <div className="language-section">
        <LanguageSelector isSidebarOpen={isOpen} />
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
        <FaSignOutAlt className="logout-icon" /> {isOpen && t("admin_sidebar.logout")}
      </button>
    </div>
  );
};

export default Sidebar;
