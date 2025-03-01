import React from "react";
import { NavLink } from "react-router-dom";
import { FaTh, FaUserAlt, FaRegChartBar, FaComment, FaShoppingBag, FaList } from "react-icons/fa";

const Sidebar = () => {
  const menuItems = [
    { path: "/manager/dashboard", name: "Dashboard", icon: <FaTh /> },
    { path: "/manager/about", name: "About", icon: <FaUserAlt /> },
    { path: "/manager/staff", name: "Staff", icon: <FaRegChartBar /> },
    { path: "/manager/comment", name: "Comment", icon: <FaComment /> },
    { path: "/manager/product", name: "Product", icon: <FaShoppingBag /> },
    { path: "/manager/productlist", name: "Product List", icon: <FaList /> },
  ];

  return (
    <div className="sidebar">
      <h2 className="logo">Logo</h2>
      {menuItems.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          className={({ isActive }) => (isActive ? "active link" : "link")}
        >
          <div className="icon">{item.icon}</div>
          <div className="link_text">{item.name}</div>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
