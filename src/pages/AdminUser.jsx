import React, { useState, useEffect } from "react";
import "../styles/AdminStaff.css";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useToast } from '../shared/Errors/ToastContext';

const AdminUser = () => {
  const [managers, setManagers] = useState([]);
  const [users, setUsers] = useState([]); // custom toast hook
  const { showToast } = useToast();

  // Pagination için state’ler
  const [currentManagerPage, setCurrentManagerPage] = useState(1);
  const [currentUserPage, setCurrentUserPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastManager = currentManagerPage * itemsPerPage;
  const indexOfFirstManager = indexOfLastManager - itemsPerPage;
  const currentManagers = managers.slice(indexOfFirstManager, indexOfLastManager);

  const indexOfLastUser = currentUserPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Form için gerekli state
  const [manager, setManager] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    username: "",
    password: "",
  });

  // Input değişikliklerini handle et
  const handleChange = (e) => {
    const { name, value } = e.target;
    setManager({ ...manager, [name]: value });
  };

  // Form validasyon
  const validateForm = () => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneRegex = /^\+?\d{10,15}$/;
    const passwordRegex = /^.{6,}$/;

    if (!emailRegex.test(manager.email)) {
      showToast("Invalid Email: Must be in the format example@domain.com.", 'error');
      return false;
    }
    if (!phoneRegex.test(manager.phone)) {
        showToast("Invalid Phone Number: Must be 10-15 digits.", 'error');
      return false;
    }
    if (!passwordRegex.test(manager.password)) {
      showToast("Password must be at least 6 characters.", 'error');
      return false;
    }
    return true;
  };

  // Yeni manager ekle
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // hotelId yok – null kaydedilsin
      await axios.post("http://localhost:8080/api/auth/register?hotelId=", {
        ...manager,
        role: "manager",
      });
      showToast("Manager added successfully!", 'success');
      setManager({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        username: "",
        password: "",
      });
      fetchManagers();
    } catch (error) {
      console.error("Error adding manager:", error);
      if (error.response) {
        if (error.response.status === 409) {
          showToast(error.response.data, 'error');
        } else {
          showToast('There was a problem adding the manager: ${error.response.data}', 'error');
        }
      } else {
        showToast("An error occurred while adding the manager.", 'error');
      }
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchManagers();
  }, []);

  // Kullanıcıları çek (role=user)
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/users?role=user");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      showToast("User information could not be retrieved.", 'error');
    }
  };

  // Manager listesini çek
  const fetchManagers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/managers");
      setManagers(res.data);
    } catch (error) {
      console.error("Error fetching managers:", error);
      showToast(" Manager information could not be retrieved.");
    }
  };

  // Manager sil
  const deleteManager = async (m) => {
    try {
      await axios.delete(`http://localhost:8080/api/managers/${m.managerId}`);
      setManagers(managers.filter((x) => x.managerId !== m.managerId));
      showToast("Manager deleted successfully!", 'success');
    } catch (error) {
      console.error("Error deleting manager:", error);
      showToast("Error ocurred when deleting Manager.", 'error');
    }
  };

  // User sil
  const deleteUser = async (u) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${u.userId}`);
      setUsers(users.filter((x) => x.userId !== u.userId));
      showToast("User deleted successfully!", 'success');
    } catch (error) {
      console.error("Error deleting user:", error);
      showToast("Error occurred when deleting User.", 'error');
    }
  };

  // Sayfa numarası değiştir
  const handleManagerPageChange = (pageNumber) => {
    setCurrentManagerPage(pageNumber);
  };

  const handleUserPageChange = (pageNumber) => {
    setCurrentUserPage(pageNumber);
  };


  // Replace the existing Pagination component with this:
const Pagination = ({ currentPage, totalItems, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="pagination">
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

  return (
    <div className="admin-user-page-container">
      <h1 className="admin-user-title">Admin User Management</h1>

      <h2>Add Manager</h2>
      <form className="admin-user-form" onSubmit={handleSubmit} noValidate>
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
          pattern="^\+?\d{10,15}$"
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
            <>
              <table className="admin-user-list-table">
                <thead>
                  <tr>
                    <th>Manager ID</th>
                    <th>Manager Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentManagers.map(m => (
                    <tr key={m.managerId}>
                      <td>{m.managerId}</td>
                      <td>{m.managerName}</td>
                      <td>
                        <button
                          className="admin-user-delete-btn"
                          onClick={() => deleteManager(m)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                currentPage={currentManagerPage}
                totalItems={managers.length}
                onPageChange={handleManagerPageChange}
              />
            </>
          ) : (
            <p>No managers found.</p>
          )}
        </div>

        <div className="admin-user-section">
          <h2>Users List</h2>
          {users.length > 0 ? (
            <>
              <table className="admin-user-list-table">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map(u => (
                    <tr key={u.userId}>
                      <td>{u.first_name}</td>
                      <td>{u.last_name}</td>
                      <td>
                        <button
                          className="admin-user-delete-btn"
                          onClick={() => deleteUser(u)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                currentPage={currentUserPage}
                totalItems={users.length}
                onPageChange={handleUserPageChange}
              />
            </>
          ) : (
            <p>No users found with role=user.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUser;
