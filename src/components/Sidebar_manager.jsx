import "../styles/ManagerSideBar.css";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { FaTh, FaUserAlt, FaInfo, FaBars } from "react-icons/fa"; 
import { BiSolidHotel } from "react-icons/bi";
import logo from "../assets/images/SidebarLogo.png";

const SidebarManager = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const [showLogo, setShowLogo] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate hook

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

  // Function to handle logout and redirect to the home page
  const handleLogout = () => {
    // Add logout functionality here (e.g., clearing local storage or token)
    navigate("/"); // Redirect to the home page
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="top_section">
        {showLogo && <img src={logo} alt="Logo" className="logo" />}
        <div className="bars" onClick={toggleSidebar}>
          <FaBars /> {/* This is the hamburger menu */}
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
      {/* Logout Button */}
      <div className="logout_button" onClick={handleLogout}>
        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default SidebarManager;
