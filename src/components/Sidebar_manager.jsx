import "../styles/ManagerSideBar.css";
import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { FaTh, FaUserAlt, FaInfo, FaBars, FaSignOutAlt } from "react-icons/fa"; 
import { BiSolidHotel } from "react-icons/bi";
import logo from "../assets/images/SidebarLogo.png";
import { AuthContext } from "../../src/context/AuthContext";

const SidebarManager = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const [showLogo, setShowLogo] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { dispatch } = useContext(AuthContext); // AuthContext üzerinden dispatch'i ekledik

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
    { path: "/manager", name: "Dashboard", icon: <FaTh /> },
    { path: "/manager/reservations", name: "Reservations", icon: <FaInfo /> },
    { path: "/manager/hotel", name: "Hotel", icon: <BiSolidHotel /> },
    { path: "/manager/profile", name: "Profile", icon: <FaUserAlt /> },
  ];

  // Logout işlevselliği: localStorage, sessionStorage ve cookie'leri temizleyip, sunucuya logout isteği gönderir.
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    sessionStorage.clear();
    // Tüm cookie'leri temizle
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // Gerekirse logout API çağrısı
    fetch("/api/logout", { method: "POST", credentials: "include" })
      .catch((err) => console.error("Logout API error:", err));

    navigate("/login"); // Kullanıcıyı giriş sayfasına yönlendir
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="top_section">
        {showLogo && <img src={logo} alt="Logo" className="logo" />}
        <div className="bars" onClick={toggleSidebar}>
          <FaBars /> {/* Hamburger menü */}
        </div>
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
      {/* Logout Butonu */}
      <button className="logout-btn" onClick={handleLogout}>
        <FaSignOutAlt className="logout-icon" /> {isOpen && "Logout"}
      </button>
    </div>
  );
};

export default SidebarManager;
