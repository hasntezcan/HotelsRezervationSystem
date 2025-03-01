import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTh, FaUserAlt, FaRegChartBar, FaComment, FaShoppingBag, FaList, FaBars } from "react-icons/fa";
import "../styles/ManagerSideBar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768); // Ekran genişliği 768px üzerindeyse açık başlasın

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { path: "/manager", name: "Dashboard", icon: <FaTh /> },
    { path: "/manager/about", name: "About", icon: <FaUserAlt /> },
    { path: "/manager/staff", name: "Staff", icon: <FaRegChartBar /> },
    { path: "/manager/rooms", name: "Rooms", icon: <FaComment /> },
    { path: "/manager/profile", name: "Profile", icon: <FaShoppingBag /> },
    { path: "/manager/productlist", name: "Product List", icon: <FaList /> },
  ];

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="top_section">
        <h2 className="logo">Logo</h2>
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

export default Sidebar;
