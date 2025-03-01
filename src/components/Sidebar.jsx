import React from "react";
import "../styles/ManagerSidebar.css";
import { NavLink } from "react-router-dom";
import { FaTh, FaUserAlt, FaRegChartBar, FaComment, FaShoppingBag, FaList, FaBars } from "react-icons/fa";
import { MdPeople } from "react-icons/md";
import { BiSolidHotel } from "react-icons/bi";
import { FcAbout } from "react-icons/fc";

const Sidebar = ({children}) => {
  const menuItems = [
    { path: "/manager", name: "Dashboard", icon: <FaTh /> },
    { path: "/manager/about", name: "About", icon: <FcAbout /> },
    { path: "/manager/staff", name: "Staff", icon: <MdPeople />},
    { path: "/manager/rooms", name: "Rooms", icon: <BiSolidHotel /> },
    { path: "/manager/profile", name: "Profile", icon: <FaUserAlt/> },
    { path: "/manager/productlist", name: "Product List", icon: <FaList /> },
  ];

  return (
        <div className="sidebar">
          <h2 className="logo">Logo</h2>
          {menuItems.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              end  // ✅ Yalnızca tam eşleşen yolu aktif yapar
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
