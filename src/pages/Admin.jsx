import React from "react";
import SidebarAdmin from "../components/Sidebar_admin"; 
import AdminNavbar from "../components/AdminNavbar"; 

const Admin = () => {
    return (
      <div style={styles.container}>
        {/* Sidebar */}
        <SidebarAdmin />

        <div style={styles.mainContent}>
          {/* ✅ Admin Navbar */}
          <AdminNavbar />

          {/* Ana İçerik Alanı */}
          <div style={styles.content}>
            <h1>Admin Paneline Hoş Geldiniz</h1>
            <p>Admin işlemlerini gerçekleştirebilirsiniz.</p>
          </div>
        </div>
      </div>
    );
};

const styles = {
    container: {
      display: "flex",
      height: "100vh",
    },
    mainContent: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: 1,
      padding: "100px 40px 40px", // ✅ Üst boşluk artırıldı (Navbar ile çakışmayı engellemek için)
      background: "#f4f4f4",
      textAlign: "center",
    },
};

export default Admin;
