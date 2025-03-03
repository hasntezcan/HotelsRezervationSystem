import React from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();  // React Router hook'u ile yönlendirme

  const handleLogout = () => {
    // Burada çıkış yap işlemlerini ekleyebilirsiniz (örneğin, localStorage temizlemek)
    // Ardından Home sayfasına yönlendirme
    navigate("/home"); // Home.jsx sayfasına yönlendirme
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.title}>Admin Paneli</h2>
      <button style={styles.logoutButton} onClick={handleLogout}>
        Çıkış Yap
      </button>
    </nav>
  );
};

const styles = {
  navbar: {
    width: "100%",
    height: "60px",
    background: "#2c3e50",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    color: "white",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "20px",
    marginLeft: "280px", // 📌 Daha fazla sağa kaydırıldı
  },
  logoutButton: {
    background: "#e74c3c",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AdminNavbar;
