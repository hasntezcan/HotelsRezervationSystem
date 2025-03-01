import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Manager = () => {
  return (
    <div className="main-container">
      <Sidebar /> {/* Sidebar sabit olacak */}
      <div className="content">
        <Outlet /> {/* İçerik buraya yüklenecek */}
      </div>
    </div>
  );
};

export default Manager;
