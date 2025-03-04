import "../styles/ManagerSideBar.css"; 
import React, { useState, useEffect } from "react"; 
import { NavLink } from "react-router-dom"; 
import { FaTh, FaUserAlt, FaList, FaBars, FaInfo } from "react-icons/fa"; 
import { BsFillPeopleFill } from "react-icons/bs"; 
import { BiSolidHotel } from "react-icons/bi"; 
import logo from "../assets/images/SidebarLogo.png"; 

const SidebarManager = () => { 
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
    { path: "/manager", name: "Dashboard", icon: <FaTh /> }, 
    { path: "/manager/status", name: "Status", icon: <FaInfo /> }, 
    { path: "/manager/hotel", name: "Hotel", icon: <BiSolidHotel /> }, 
    { path: "/manager/users", name: "User List", icon: <FaUserAlt /> } 
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
    </div> 
  ); 
}; 

export default SidebarManager;
