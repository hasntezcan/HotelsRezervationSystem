import React, { useState, useEffect } from "react";
import "../styles/AdminStaff.css";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AdminStaff = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "User",
  });

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("localUsers")) || [];
    setUsers(storedUsers);
  }, []);

  const validateInputs = () => {
    if (!newUser.username || !newUser.email || !newUser.password) {
      alert("Lütfen tüm alanları doldurun!");
      return false;
    }
    if (!emailRegex.test(newUser.email)) {
      alert("Geçerli bir e-posta adresi girin!");
      return false;
    }
    return true;
  };

  const addOrUpdateUser = () => {
    if (!validateInputs()) return;

    let updatedUsers;
    if (editingUser) {
      updatedUsers = users.map((user) =>
        user.id === editingUser.id ? { ...user, ...newUser } : user
      );
      setEditingUser(null);
    } else {
      const newUserObj = {
        id: Date.now(),
        ...newUser,
      };
      updatedUsers = [...users, newUserObj];
    }

    setUsers(updatedUsers);
    localStorage.setItem("localUsers", JSON.stringify(updatedUsers));
    setNewUser({ username: "", email: "", password: "", role: "User" });
  };

  const editUser = (user) => {
    setNewUser(user);
    setEditingUser(user);
  };

  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("localUsers", JSON.stringify(updatedUsers));
  };

  return (
    <div className="user-management-container">
      <h1 className="user-management-title">Kullanıcı Yönetimi</h1>

      {/* Kullanıcı Ekleme Formu */}
      <div className="user-form">
        <h2>{editingUser ? "Kullanıcıyı Güncelle" : "Yeni Kullanıcı Ekle"}</h2>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          className="input-field"
        />
        <input
          type="email"
          placeholder="E-posta"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="input-field"
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Şifre"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            className="input-field"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="toggle-password-btn"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="input-field"
        >
          <option value="User">User</option>
          <option value="Manager">Manager</option>
        </select>
        <button onClick={addOrUpdateUser} className="submit-btn">
          {editingUser ? "Güncelle" : "Ekle"}
        </button>
      </div>

      {/* Kullanıcı Listesi */}
      <div className="user-list">
        <h2>Kayıtlı Kullanıcılar</h2>
        <ul>
          {users.length > 0 ? (
            users.map((user) => (
              <li key={user.id} className="user-item">
                <div className="user-info">
                  <span>
                    <strong>{user.username}</strong> - {user.email} ({user.role})
                  </span>
                </div>
                <div className="action-buttons">
                  <button onClick={() => editUser(user)} className="update-btn">
                    Güncelle
                  </button>
                  <button onClick={() => deleteUser(user.id)} className="delete-btn">
                    Sil
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>Kayıtlı kullanıcı bulunamadı.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminStaff;
