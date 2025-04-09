import React, { useState, useEffect } from "react";
import "../styles/AdminStaff.css";
import axios from "axios";

const AdminUser = () => {
  // Veritabanından role=manager olan kullanıcıları tutan state
  const [managers, setManagers] = useState([]);

  // Yeni manager formu (isteğe bağlı)
  const [newManager, setNewManager] = useState({
    name: "",
    email: "",
    hotelName: "",
    city: "",
    username: "",
    password: ""
  });

  // --- Users listesi (role=user) veritabanından çekilecek ---
  const [users, setUsers] = useState([]);

  // Sayfa yüklendiğinde hem role=user hem de role=manager kullanıcılarını çekiyoruz
  useEffect(() => {
    fetchUsers();
    fetchManagers();
  }, []);

  // Veritabanından role=user olan kullanıcıları çek
  const fetchUsers = async () => {
    try {
      // Spring Boot tarafında GET /api/users?role=user
      const response = await axios.get("http://localhost:8080/api/users?role=user");
      setUsers(response.data);
      // Beklenen data: [{ userId:1, first_name:'Ali', last_name:'Veli', ... }, ...]
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to fetch users with role=user.");
    }
  };

  // Veritabanından role=manager olan kullanıcıları çek
  const fetchManagers = async () => {
    try {
      // Spring Boot tarafında GET /api/users?role=manager
      const response = await axios.get("http://localhost:8080/api/users?role=manager");
      setManagers(response.data);
      // Beklenen data: [{ userId:1, first_name:'ManagerFirstName', last_name:'ManagerLastName', ... }, ...]
    } catch (error) {
      console.error("Error fetching managers:", error);
      alert("Failed to fetch managers with role=manager.");
    }
  };

  // Manager ekle (local state, örnek için; formun backend'e kayıt işlemi yapılmıyor)
  const addManager = () => {
    setManagers([...managers, newManager]);
    setNewManager({ name: "", email: "", hotelName: "", city: "", username: "", password: "" });
  };

  // Manager formu input değişikliği
  const handleInputChange = (e) => {
    setNewManager({ ...newManager, [e.target.name]: e.target.value });
  };

  // Manager sil (backend + local state)  
  const deleteManager = async (userId) => {
    try {
      // DELETE /api/users/{userId} endpoint'i manager silme işlemini gerçekleştirecek şekilde yapılandırılmış olmalı
      await axios.delete(`http://localhost:8080/api/users/${userId}`);
      // Başarılı ise local state'ten manager'ı çıkarıyoruz
      setManagers(managers.filter((manager) => manager.userId !== userId));
    } catch (error) {
      console.error("Error deleting manager:", error);
      alert("Failed to delete manager.");
    }
  };

  // Kullanıcı (role=user) sil (backend + local state)
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${userId}`);
      setUsers((prev) => prev.filter((u) => u.userId !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  return (
    <div className="admin-user-page-container">
      <h1 className="admin-user-title">Admin User Management</h1>
      <div className="admin-user-management-section">
        
        {/* Manager Ekleme Formu (isteğe bağlı) */}
        <div className="admin-user-section fixed-section" style={{ color: "white" }}>
          <h2>Add Manager</h2>
          <div className="admin-user-form grid-layout">
            <div className="admin-user-input-group">
              <input
                className="admin-user-input"
                type="text"
                name="name"
                placeholder="Name"
                value={newManager.name}
                onChange={handleInputChange}
              />
              <input
                className="admin-user-input"
                type="email"
                name="email"
                placeholder="Email"
                value={newManager.email}
                onChange={handleInputChange}
              />
              <input
                className="admin-user-input"
                type="text"
                name="hotelName"
                placeholder="Hotel Name"
                value={newManager.hotelName}
                onChange={handleInputChange}
              />
            </div>
            <div className="admin-user-input-group">
              <input
                className="admin-user-input"
                type="text"
                name="city"
                placeholder="City"
                value={newManager.city}
                onChange={handleInputChange}
              />
              <input
                className="admin-user-input"
                type="text"
                name="username"
                placeholder="Username"
                value={newManager.username}
                onChange={handleInputChange}
              />
              <input
                className="admin-user-input"
                type="password"
                name="password"
                placeholder="Password"
                value={newManager.password}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button className="admin-user-button" onClick={addManager}>Add Manager</button>
        </div>

        {/* Managers List: Sadece role=manager olanların isim ve soyisimleri ve silme butonu */}
        <div className="admin-user-section" style={{ color: "white" }}>
          <h2>Managers List</h2>
          {managers.length > 0 ? (
            <table className="admin-user-list-table">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {managers.map((manager) => (
                  <tr key={manager.userId}>
                    <td>{manager.first_name}</td>
                    <td>{manager.last_name}</td>
                    <td>
                      <button
                        className="admin-user-delete-btn"
                        onClick={() => deleteManager(manager.userId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No managers found with role=manager.</p>
          )}
        </div>

        {/* Users List (role=user) - DB'den */}
        <div className="admin-user-section" style={{ color: "white" }}>
          <h2>Users List</h2>
          {users.length > 0 ? (
            <table className="admin-user-list-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.userId}>
                    <td>{u.first_name}</td>
                    <td>{u.last_name}</td>
                    <td>
                      <button
                        className="admin-user-delete-btn"
                        onClick={() => deleteUser(u.userId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No users found with role=user.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUser;
