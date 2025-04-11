import React, { useState, useEffect } from "react";
import "../styles/AdminStaff.css";
import axios from "axios";

const AdminUser = () => {
  const [managers, setManagers] = useState([]);
  const [users, setUsers] = useState([]);

  // 🔧 Form için gerekli state; alan isimleri backend User modeline göre güncellendi.
  const [manager, setManager] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    username: '',
    password: '',
  });

  // 🔧 Form için input değişikliklerini handle et
  const handleChange = (e) => {
    const { name, value } = e.target;
    setManager({ ...manager, [name]: value });
  };

  // 🔧 Manager ekleme fonksiyonu; POST isteği AuthController'daki register endpoint'ine role=manager şeklinde user bilgisi gönderir.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Kayıt isteği yapılırken eklenen role manager, böylece kayıt backend'te users tablosuna manager olarak işlenir.
      await axios.post("http://localhost:8080/api/auth/register", {
        ...manager,
        role: "manager",
      });
      alert("Manager added successfully!");
      // Form alanlarını temizle
      setManager({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        username: '',
        password: '',
      });
      fetchManagersWithHotelInfo(); // Listeyi güncelle
    } catch (error) {
      console.error("Error adding manager:", error);
      alert("Failed to add manager.");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchManagersWithHotelInfo();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users?role=user");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to fetch users with role=user.");
    }
  };

  const fetchManagersWithHotelInfo = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users?role=manager");
      const managersData = response.data;

      const managersWithHotelInfo = await Promise.all(
        managersData.map(async (manager) => {
          try {
            const hotelResponse = await axios.get(
              `http://localhost:8080/api/hotels/manager?userId=${manager.userId}`
            );
            const hotelData = Array.isArray(hotelResponse.data)
              ? (hotelResponse.data.length > 0 ? hotelResponse.data[0] : null)
              : hotelResponse.data;
            return {
              ...manager,
              hotelName: hotelData?.name || "N/A",
              city: hotelData?.city || "N/A"
            };
          } catch (error) {
            console.error(`Error fetching hotel info for manager ${manager.userId}:`, error);
            return {
              ...manager,
              hotelName: "N/A",
              city: "N/A"
            };
          }
        })
      );
      setManagers(managersWithHotelInfo);
    } catch (error) {
      console.error("Error fetching managers:", error);
      alert("Failed to fetch managers with role=manager.");
    }
  };

  const deleteManager = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${userId}`);
      setManagers(managers.filter((manager) => manager.userId !== userId));
    } catch (error) {
      console.error("Error deleting manager:", error);
      alert("Failed to delete manager.");
    }
  };

  return (
    <div className="admin-user-page-container">
      <h1 className="admin-user-title">Admin User Management</h1>
      
      <h2>Add Manager</h2>
      <form className="admin-user-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="admin-user-input"
          name="first_name"
          placeholder="First Name"
          value={manager.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          className="admin-user-input"
          name="last_name"
          placeholder="Last Name"
          value={manager.last_name}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          className="admin-user-input"
          name="phone"
          placeholder="Phone Number"
          value={manager.phone}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          className="admin-user-input"
          name="email"
          placeholder="Email"
          value={manager.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          className="admin-user-input"
          name="username"
          placeholder="Username"
          value={manager.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          className="admin-user-input"
          name="password"
          placeholder="Password"
          value={manager.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="admin-user-button">
          Add Manager
        </button>
      </form>

      <div className="admin-user-management-section">
        <div className="admin-user-section">
          <h2>Managers List</h2>
          {managers.length > 0 ? (
            <table className="admin-user-list-table">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Hotel Name</th>
                  <th>City</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {managers.map((manager) => (
                  <tr key={manager.userId}>
                    <td>{manager.first_name}</td>
                    <td>{manager.last_name}</td>
                    <td>{manager.hotelName}</td>
                    <td>{manager.city}</td>
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

        <div className="admin-user-section">
          <h2>Users List</h2>
          {users.length > 0 ? (
            <table className="admin-user-list-table">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.userId}>
                    <td>{u.first_name}</td>
                    <td>{u.last_name}</td>
                    <td>
                      <button className="admin-user-delete-btn">
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
