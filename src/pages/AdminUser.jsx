import React, { useState, useEffect } from "react";
import SidebarAdmin from "../components/Sidebar_admin";
import AdminNavbar from "../components/AdminNavbar";

const roles = ["Admin", "Manager", "User"];
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AdminUser = () => {
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers
      ? JSON.parse(storedUsers)
      : [
          { id: 1, firstName: "Ahmet", lastName: "Yılmaz", email: "ahmet@example.com", password: "1234", role: "User" },
          { id: 2, firstName: "Ayşe", lastName: "Kaya", email: "ayse@example.com", password: "5678", role: "Manager" },
          { id: 3, firstName: "Emir", lastName: "Emir", email: "emir@emir.com", password: "emir", role: "User" }
        ];
  });

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "User",
  });

  const [errors, setErrors] = useState({});
  const [editingUserId, setEditingUserId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const validateInputs = () => {
    let validationErrors = {};
    if (!newUser.firstName) validationErrors.firstName = "İsim boş bırakılamaz!";
    if (!newUser.lastName) validationErrors.lastName = "Soyisim boş bırakılamaz!";
    if (!newUser.email) validationErrors.email = "E-posta boş bırakılamaz!";
    if (newUser.email && !emailRegex.test(newUser.email)) {
      validationErrors.email = "Geçerli bir e-posta adresi girin!";
      alert("E-posta geçerli değil!");
      return false;
    }
    if (!newUser.phoneNumber) validationErrors.phoneNumber = "Telefon numarası boş bırakılamaz!";
    if (!newUser.password) validationErrors.password = "Şifre boş bırakılamaz!";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      alert("Lütfen tüm alanları doldurun.");
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
        ...newUser,
      };
      setUsers([...users, newUserObj]);
    }
    setNewUser({ firstName: "", lastName: "", email: "", phoneNumber: "", password: "", role: "User" });
  };

  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const editUser = (user) => {
    setNewUser(user);
    setEditingUserId(user.id);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={styles.pageContainer}>
      <SidebarAdmin />
      <div style={styles.mainContent}>
        <AdminNavbar />
        <section className="vh-100 gradient-custom">
          <div className="container py-5 h-100">
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-12 col-lg-9 col-xl-7">
                <div className="card shadow-2-strong card-registration" style={{ borderRadius: "15px" }}>
                  <div className="card-body p-4 p-md-5">
                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Kullanıcı Ekle</h3>
                    <form onSubmit={(e) => { e.preventDefault(); addOrUpdateUser(); }}>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="firstName"
                              className="form-control form-control-lg"
                              value={newUser.firstName}
                              onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                            />
                            <label className="form-label" htmlFor="firstName">First Name</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="lastName"
                              className="form-control form-control-lg"
                              value={newUser.lastName}
                              onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                            />
                            <label className="form-label" htmlFor="lastName">Last Name</label>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="email"
                              id="email"
                              className="form-control form-control-lg"
                              value={newUser.email}
                              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            />
                            <label className="form-label" htmlFor="email">Email</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="tel"
                              id="phoneNumber"
                              className="form-control form-control-lg"
                              value={newUser.phoneNumber}
                              onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
                            />
                            <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type={showPassword ? "text" : "password"} // Şifreyi göster veya gizle
                              id="password"
                              className="form-control form-control-lg"
                              value={newUser.password}
                              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            />
                            <label className="form-label" htmlFor="password">Password</label>
                            <button type="button" className="btn btn-link" onClick={togglePasswordVisibility}>
                              {showPassword ? "Hide" : "Show"}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12 mb-4">
                          <select
                            className="form-select form-control-lg"
                            value={newUser.role}
                            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                          >
                            {roles.map((role) => (
                              <option key={role} value={role}>
                                {role}
                              </option>
                            ))}
                          </select>
                          <label className="form-label">Role</label>
                        </div>
                      </div>

                      <div className="mt-4 pt-2">
                        <button type="submit" className="btn" style={styles.editButton}>Düzenle</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div style={styles.userListContainer}>
          <h2>Kullanıcılar</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id} style={styles.jobBox}>
                <div className="job-left">
                  <div className="img-holder">
                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                  </div>
                  <div className="job-content">
                    <h5>{user.firstName} {user.lastName}</h5>
                    <ul>
                      <li><i className="zmdi zmdi-pin"></i> {user.email}</li>
                      <li><i className="zmdi zmdi-lock"></i> Şifre: {user.password}</li>
                      <li><i className="zmdi zmdi-account"></i> Rol: {user.role}</li>
                    </ul>
                  </div>
                </div>
                <div className="job-right">
                  <button
                    style={styles.editButton}
                    onClick={() => editUser(user)}
                  >
                    Düzenle
                  </button>
                  <button
                    style={styles.deleteButton}
                    onClick={() => deleteUser(user.id)}
                  >
                    Sil
                  </button>
                </div>
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
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "20px",
    width: "80%",
    alignItems: "center",
  },
  formContainer: {
    padding: "20px",
    backgroundColor: "#d3d3d3", // Gri arka plan
    borderRadius: "8px",
    width: "100%",
    maxWidth: "500px",
    color: "#333", // Siyah metin rengi
  },
  userListContainer: {
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "800px",
  },
  jobBox: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  deleteButton: {
    backgroundColor: "#C70039", // Sil butonu rengi
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "background-color 0.3s",
  },
  editButton: {
    backgroundColor: "#6495ED", // Düzenle butonu rengi
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AdminUser;
