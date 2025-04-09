import React, { useState, useEffect } from "react";
import "../styles/AdminStaff.css";
import axios from "axios";

const AdminUser = () => {
  // Managers bölümü (Sizin eski local state veriniz)
  const [managers, setManagers] = useState([
    { name: "Alice Johnson", email: "alice@example.com", hotelName: "Grand Hotel", city: "New York", username: "aliceJ", password: "password123" },
    { name: "Bob Smith", email: "bob@example.com", hotelName: "Sunset Resort", city: "Los Angeles", username: "bobS", password: "securepass" }
  ]);

  // Yeni manager formu
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

  // Sayfa yüklendiğinde role=user kullanıcıları çek
  useEffect(() => {
    fetchUsers();
  }, []);

  // Veritabanından role=user olan kullanıcıları çek
  const fetchUsers = async () => {
    try {
      // Spring Boot tarafında GET /api/users?role=user
      // bu sorgu role='user' olanları döndürecek şekilde ayarlanmış olmalı
      const response = await axios.get("http://localhost:8080/api/users?role=user");
      setUsers(response.data); 
      // Beklenen data: [{ userId:1, firstName:'Ali', lastName:'Veli', ... }, ...]
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to fetch users with role=user.");
    }
  };

  // Manager ekle (local state)
  const addManager = () => {
    setManagers([...managers, newManager]);
    setNewManager({ name: "", email: "", hotelName: "", city: "", username: "", password: "" });
  };

  // Manager formu input değişikliği
  const handleInputChange = (e) => {
    setNewManager({ ...newManager, [e.target.name]: e.target.value });
  };

  // Manager sil (local state)
  const deleteManager = (username) => {
    setManagers(managers.filter(manager => manager.username !== username));
  };

  // Manager düzenle
  const editManager = (index) => {
    const managerToEdit = managers[index];
    setNewManager(managerToEdit);
  };

  // Kullanıcı (role=user) sil (veritabanı + local state)
  const deleteUser = async (userId) => {
    try {
      // DELETE /api/users/{userId}
      await axios.delete(`http://localhost:8080/api/users/${userId}`);
      // Başarılıysa local state'ten çıkar
      setUsers(prev => prev.filter(u => u.userId !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  return (
    <div className="admin-user-page-container">
      <h1 className="admin-user-title">Admin User Management</h1>
      <div className="admin-user-management-section">
        
        {/* Manager Ekleme Formu */}
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

        {/* Managerları Görme (Local State) */}
        <div className="admin-user-section" style={{ color: "white" }}>
          <h2>Managers List</h2>
          <ul className="admin-user-list">
            {managers.map((manager, index) => (
              <li className="admin-user-list-item" key={index} style={{ color: "white" }}>
                {manager.name} ({manager.email}) - {manager.hotelName}, {manager.city}
                <button className="admin-user-edit-btn" onClick={() => editManager(index)}>Edit</button>
                <button className="admin-user-delete-btn" onClick={() => deleteManager(manager.username)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Users List (role=user) - DB'den */}
        <div className="admin-user-section" style={{ color: "white" }}>
          <h2>Users List </h2>
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
