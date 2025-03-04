import React, { useState, useEffect } from "react";
import SidebarAdmin from "../components/Sidebar_admin";
import AdminNavbar from "../components/AdminNavbar";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ManagerUser = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "User"
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
      updatedUsers = users.map(user =>
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
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("localUsers", JSON.stringify(updatedUsers));
  };

  return (
    <div style={styles.pageContainer}>
      <SidebarAdmin />
      <div style={styles.mainContent}>
        <AdminNavbar />
        <div style={styles.content}>
          <h1 style={styles.title}>Kullanıcı Yönetimi</h1>

          {/* Kullanıcı Ekleme Formu */}
          <div style={styles.formContainer}>
            <h2>{editingUser ? "Kullanıcıyı Güncelle" : "Yeni Kullanıcı Ekle"}</h2>
            <input
              type="text"
              placeholder="Kullanıcı Adı"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              style={styles.input}
            />
            <input
              type="email"
              placeholder="E-posta"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              style={styles.input}
            />
            <div style={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Şifre"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                style={styles.input}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.showButton}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              style={styles.input}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
            </select>
            <button 
              onClick={addOrUpdateUser} 
              style={styles.button}
            >
              {editingUser ? "Güncelle" : "Ekle"}
            </button>
          </div>

          {/* Kullanıcı Listesi */}
          <div style={styles.userListContainer}>
            <h2>Kayıtlı Kullanıcılar</h2>
            <ul style={styles.list}>
              {users.length > 0 ? (
                users.map((user) => (
                  <li key={user.id} style={styles.listItem}>
                    <div style={styles.userInfo}>
                      <span><strong>{user.username}</strong> - {user.email} {user.role}</span>
                    </div>
                    <div style={styles.buttonGroup}>
                      <button onClick={() => editUser(user)} style={styles.updateButton}>
                        Güncelle
                      </button>
                      <button onClick={() => deleteUser(user.id)} style={styles.deleteButton}>
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
    padding: "20px",
    marginLeft: "250px",
  },
  title: {
    textAlign: "center",
    color: "#333",
  },
  formContainer: {
    padding: "20px",
    background: "linear-gradient(135deg, #454545, #999999)",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
    color: "#fff",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    background: "#eee",
  },
  passwordContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  showButton: {
    background: "#ddd",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  userListContainer: {
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "800px",
    margin: "20px auto",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "8px",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
  },
  updateButton: {
    backgroundColor: "#FFA500", // Güncelleme butonu (Turuncu)
    color: "white",
    padding: "8px 12px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "#C70039",
    color: "white",
    padding: "8px 12px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
};

export default ManagerUser;
