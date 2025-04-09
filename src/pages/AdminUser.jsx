import React, { useState, useEffect } from "react";
import "../styles/AdminStaff.css";
import axios from "axios";

const AdminUser = () => {
  const [managers, setManagers] = useState([]);
  const [users, setUsers] = useState([]);

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
      const managersData = response.data; // Örnek veri: [{ userId, first_name, last_name, ... }, ...]
      
      const managersWithHotelInfo = await Promise.all(
        managersData.map(async (manager) => {
          try {
            // Burada parametreyi kontrol edin: userId yerine managerId vs. olması gerekebilir.
            const hotelResponse = await axios.get(`http://localhost:8080/api/hotels/manager?userId=${manager.userId}`);
            console.log(`Hotel response for manager ${manager.userId}:`, hotelResponse.data);
            // Eğer backend liste döndürüyorsa, ilk elemanı alıyoruz; eğer nesne dönerse doğrudan eşliyoruz.
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
      <div className="admin-user-management-section">
        <div className="admin-user-section" style={{ color: "white" }}>
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
        {/* Users list bölümü olduğu gibi kalıyor */}
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
                        onClick={() => { /* deleteUser fonksiyonunuz */ }}
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
