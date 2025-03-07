import "../styles/ManagerSideBar.css";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaTh, FaUserAlt, FaInfo, FaBars, FaSignOutAlt } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { BiSolidHotel } from "react-icons/bi";
import logo from "../assets/images/SidebarLogo.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const [showLogo, setShowLogo] = useState(true);
  const navigate = useNavigate(); // Sayfa yönlendirmesi için

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
    // Kullanıcı oturum bilgilerini temizle
    localStorage.removeItem("admin"); // Eğer admin bilgileri LocalStorage'da tutuluyorsa
    localStorage.removeItem("token"); // Eğer JWT token saklanıyorsa onu da kaldır
    sessionStorage.clear(); // Tüm session'ı temizle
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // Sunucudan oturumu kapatma işlemi varsa çağır
    fetch("/api/logout", { method: "POST", credentials: "include" })
      .catch((err) => console.error("Logout API error:", err));

    navigate("/login"); // Kullanıcıyı giriş sayfasına yönlendir
  };

  const menuItems = [
    { path: "/admin", name: "Dashboard", icon: <FaTh /> },
    { path: "/admin/contactus", name: "Contact Us", icon: <FaInfo /> },
    { path: "/admin/user", name: "User", icon: <BsFillPeopleFill /> },
    { path: "/admin/hotels", name: "Hotels", icon: <BiSolidHotel /> },
    { path: "/admin/profile", name: "Profile", icon: <FaUserAlt /> },
  ];

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="top_section">
        {showLogo && <img src={logo} alt="Logo" className="logo" />}
        <div className="bars" onClick={toggleSidebar}>
          <FaBars />
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

export default Sidebar;
