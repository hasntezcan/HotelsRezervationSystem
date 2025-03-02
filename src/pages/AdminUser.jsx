import React, { useState, useEffect } from "react";
import SidebarAdmin from "../components/Sidebar_admin"; 
import AdminNavbar from "../components/AdminNavbar"; 

const roles = ["Admin", "Manager", "User"];
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AdminUser = () => {
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [
      { id: 1, firstName: "Ahmet", lastName: "Yılmaz", email: "ahmet@example.com", password: "1234", role: "User" },
      { id: 2, firstName: "Ayşe", lastName: "Kaya", email: "ayse@example.com", password: "5678", role: "Manager" },
    ];
  });

  const [newUser, setNewUser] = useState({ firstName: "", lastName: "", email: "", password: "", role: "User" });
  const [errors, setErrors] = useState({});
  const [editingUserId, setEditingUserId] = useState(null);

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
      const updatedUsers = users.map((user) =>
        user.id === editingUserId ? { ...user, ...newUser } : user
      );
      setUsers(updatedUsers);
      setEditingUserId(null);
    } else {
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

  const editUser = (user) => {
    setNewUser(user);
    setEditingUserId(user.id);
  };

  return (
    <div style={styles.pageContainer}>
      <SidebarAdmin />
      <div style={styles.mainContent}>
        <AdminNavbar />
        
        <div style={styles.content}>
          <h1 style={styles.title}>Kullanıcı Yönetimi</h1>

          <div style={styles.formContainer}>
            <h2>{editingUserId ? "Kullanıcıyı Güncelle" : "Yeni Kullanıcı Ekle"}</h2>
            <input
              type="text"
              placeholder="İsim"
              value={newUser.firstName}
              onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
              style={errors.firstName ? styles.inputError : styles.input}
            />
            {errors.firstName && <p style={styles.errorText}>{errors.firstName}</p>}

            <input
              type="text"
              placeholder="Soyisim"
              value={newUser.lastName}
              onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
              style={errors.lastName ? styles.inputError : styles.input}
            />
            {errors.lastName && <p style={styles.errorText}>{errors.lastName}</p>}

            <input
              type="email"
              placeholder="E-posta"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              style={errors.email ? styles.inputError : styles.input}
            />
            {errors.email && <p style={styles.errorText}>{errors.email}</p>}

            <input
              type="password"
              placeholder="Şifre"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              style={errors.password ? styles.inputError : styles.input}
            />
            {errors.password && <p style={styles.errorText}>{errors.password}</p>}

            <button 
              onClick={addOrUpdateUser} 
              style={styles.button(editingUserId ? "#ffc107" : "#28a745")}>
              {editingUserId ? "Güncelle" : "Ekle"}
            </button>
          </div>

          <h2 style={styles.listTitle}>Kullanıcılar</h2>
          <ul style={styles.list}>
            {users.map((user) => (
              <li key={user.id} style={styles.listItem}>
                <span><strong>{user.firstName} {user.lastName}</strong> - {user.email}</span>
                <span><strong>Rol:</strong> {user.role}</span>
                
                <button onClick={() => editUser(user)} style={styles.actionButton("#007bff")}>Düzenle</button>
                <button onClick={() => deleteUser(user.id)} style={styles.actionButton("#e74c3c")}>Sil</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "800px",
  },
  title: {
    textAlign: "center",
    color: "#333",
  },
  formContainer: {
    width: "100%",
    background: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  inputError: {
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    borderRadius: "5px",
    border: "1px solid red",
  },
  errorText: {
    color: "red",
    fontSize: "14px",
  },
  button: (color) => ({
    width: "100%",
    padding: "12px",
    background: color,
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }),
  listTitle: {
    marginTop: "20px",
  },
  list: {
    width: "100%",
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#fff",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "8px",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
  },
  actionButton: (color) => ({
    background: color,
    color: "white",
    padding: "8px",
    borderRadius: "5px",
    margin: "5px 5px 0 0",
    cursor: "pointer",
  }),
};

export default AdminUser;
