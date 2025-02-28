import React, { useState } from "react";

const roles = ["Admin", "Manager", "User"]; // Mevcut roller

const AdminDashboard = () => {
  // Kullanıcı listesi
  const [users, setUsers] = useState([
    { id: 1, name: "Ahmet", email: "ahmet@example.com", role: "User" },
    { id: 2, name: "Ayşe", email: "ayse@example.com", role: "Manager" },
  ]);

  // Yeni kullanıcı bilgileri
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "User" });

  // Kullanıcı ekleme fonksiyonu
  const addUser = () => {
    if (newUser.name && newUser.email) {
      const newUserObj = {
        id: users.length + 1,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      };
      setUsers([...users, newUserObj]); // Yeni kullanıcıyı ekle
      setNewUser({ name: "", email: "", role: "User" }); // Formu sıfırla
    } else {
      alert("Lütfen isim ve e-posta girin!");
    }
  };

  // Kullanıcı silme fonksiyonu
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Kullanıcı rolünü güncelleme fonksiyonu
  const updateUserRole = (id, newRole) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Paneli</h1>

      {/* Kullanıcı ekleme formu */}
      <div>
        <h2>Yeni Kullanıcı Ekle</h2>
        <input
          type="text"
          placeholder="İsim"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="E-posta"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />

        {/* Rol seçimi */}
        <div>
          <label>Rol Seç:</label>
          {roles.map((role) => (
            <label key={role}>
              <input
                type="radio"
                value={role}
                checked={newUser.role === role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              />
              {role}
            </label>
          ))}
        </div>

        <button onClick={addUser}>Ekle</button>
      </div>

      {/* Kullanıcı listesi */}
      <h2>Kullanıcılar</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email} - <strong>{user.role}</strong>{" "}
            <button onClick={() => deleteUser(user.id)}>Sil</button>

            {/* Kullanıcı rolünü değiştirme */}
            <select
              value={user.role}
              onChange={(e) => updateUserRole(user.id, e.target.value)}
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
