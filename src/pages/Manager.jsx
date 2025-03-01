import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ManagerStaff from "./ManagerStaff"; // Sadece gerekli importları bırak

const Manager = () => {
  return (
    <div className="main-container">
      <Sidebar />
      <div className="content">
        <Outlet /> {/* Burada children bileşenler dinamik olarak yüklenecek */}
      </div>
    </div>
  );
};

export default Manager;
