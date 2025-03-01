import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ManagerAbout from "./ManagerAbout";
import ManagerDashboard from "./ManagerDashboard";
import ManagerStaff from "./ManagerStaff";
const Manager = () => {
  return (
    <div className="main-container">
      <Sidebar />
      <div className="content">
        <Outlet /> {/* Yalnızca <Outlet /> kullanılmalı */}
      </div>
    </div>
  );
};

export default Manager;
