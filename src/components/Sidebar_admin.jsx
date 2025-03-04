import "../styles/ManagerSideBar.css";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaTh, FaUserAlt, FaList, FaBars } from "react-icons/fa";
import logo from "../assets/images/logo.png";

const SidebarAdmin = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const [showLogo, setShowLogo] = useState(true);

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
    { path: "/admin", name: "Dashboard", icon: <FaTh /> },
    { path: "/admin/status", name: "Status", icon: <FaUserAlt /> },
    { path: "/admin/users", name: "User List", icon: <FaList /> },
  ];

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="top_section">
        {showLogo && (
          <img src={logo} alt="Logo" className="logo" />
        )}
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
    </div>
  );
};

export default SidebarAdmin;
