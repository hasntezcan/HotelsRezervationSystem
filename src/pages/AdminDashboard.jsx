import React, { useState, useEffect } from "react";

const roles = ["Admin", "Manager", "User"];
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // ✅ E-posta doğrulama regex

const AdminDashboard = () => {
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [
      { id: 1, firstName: "Ahmet", lastName: "Yılmaz", email: "ahmet@example.com", password: "1234", role: "User" },
      { id: 2, firstName: "Ayşe", lastName: "Kaya", email: "ayse@example.com", password: "5678", role: "Manager" },
    ];
  });

  const [newUser, setNewUser] = useState({ firstName: "", lastName: "", email: "", password: "", role: "User" });
  const [errors, setErrors] = useState({});
  const [editingUserId, setEditingUserId] = useState(null); // Düzenlenen kullanıcının ID'sini tutar

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const validateInputs = () => {
    let validationErrors = {};
    
    if (!newUser.firstName) validationErrors.firstName = "İsim boş bırakılamaz!";
    if (!newUser.lastName) validationErrors.lastName = "Soyisim boş bırakılamaz!";
    if (!newUser.email) validationErrors.email = "E-posta boş bırakılamaz!";
    if (!newUser.password) validationErrors.password = "Şifre boş bırakılamaz!";
    
    if (newUser.email && !emailRegex.test(newUser.email)) {
      validationErrors.email = "Geçerli bir e-posta adresi girin!";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const addOrUpdateUser = () => {
    if (!validateInputs()) return;

    if (editingUserId) {
      // Güncelleme işlemi
      const updatedUsers = users.map((user) =>
        user.id === editingUserId ? { ...user, ...newUser } : user
      );
      setUsers(updatedUsers);
      setEditingUserId(null);
    } else {
      // Yeni kullanıcı ekleme işlemi
      const newUserObj = {
        id: users.length + 1,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
      };
      setUsers([...users, newUserObj]);
    }

    setNewUser({ firstName: "", lastName: "", email: "", password: "", role: "User" });
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const updateUserRole = (id, newRole) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
  };

  const editUser = (user) => {
    setNewUser(user);
    setEditingUserId(user.id);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Admin Paneli</h1>

      <div style={{ background: "#f9f9f9", padding: "15px", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
        <h2>{editingUserId ? "Kullanıcıyı Güncelle" : "Yeni Kullanıcı Ekle"}</h2>
        <input
          type="text"
          placeholder="İsim"
          value={newUser.firstName}
          onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
          style={{ width: "100%", padding: "8px", margin: "5px 0", borderRadius: "5px", border: errors.firstName ? "1px solid red" : "1px solid #ccc" }}
        />
        {errors.firstName && <p style={{ color: "red", fontSize: "14px" }}>{errors.firstName}</p>}

        <input
          type="text"
          placeholder="Soyisim"
          value={newUser.lastName}
          onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
          style={{ width: "100%", padding: "8px", margin: "5px 0", borderRadius: "5px", border: errors.lastName ? "1px solid red" : "1px solid #ccc" }}
        />
        {errors.lastName && <p style={{ color: "red", fontSize: "14px" }}>{errors.lastName}</p>}

        <input
          type="email"
          placeholder="E-posta"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          style={{ width: "100%", padding: "8px", margin: "5px 0", borderRadius: "5px", border: errors.email ? "1px solid red" : "1px solid #ccc" }}
        />
        {errors.email && <p style={{ color: "red", fontSize: "14px" }}>{errors.email}</p>}

        <input
          type="password"
          placeholder="Şifre"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          style={{ width: "100%", padding: "8px", margin: "5px 0", borderRadius: "5px", border: errors.password ? "1px solid red" : "1px solid #ccc" }}
        />
        {errors.password && <p style={{ color: "red", fontSize: "14px" }}>{errors.password}</p>}

        <button 
          onClick={addOrUpdateUser} 
          style={{ width: "100%", padding: "10px", background: editingUserId ? "#ffc107" : "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          {editingUserId ? "Güncelle" : "Ekle"}
        </button>
      </div>

      <h2 style={{ marginTop: "20px" }}>Kullanıcılar</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {users.map((user) => (
          <li key={user.id} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", background: "#fff", padding: "10px", borderRadius: "5px", marginBottom: "8px", boxShadow: "0px 2px 5px rgba(0,0,0,0.1)" }}>
            <span><strong>{user.firstName} {user.lastName}</strong></span>
            <span>{user.email}</span>
            <span><strong>Rol:</strong> {user.role}</span>
            
            <button onClick={() => editUser(user)} style={{ background: "#007bff", color: "white", padding: "5px", borderRadius: "5px", marginRight: "5px" }}>Düzenle</button>
            <button onClick={() => deleteUser(user.id)} style={{ background: "#e74c3c", color: "white", padding: "5px", borderRadius: "5px" }}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
