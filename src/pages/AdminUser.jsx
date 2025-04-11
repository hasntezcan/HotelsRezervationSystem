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

  // Form validasyon fonksiyonu: Email, telefon ve şifre için regex kuralları
  const validateForm = () => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneRegex = /^\+?\d{10,15}$/;
    const passwordRegex = /^.{6,}$/;

    if (!emailRegex.test(manager.email)) {
      alert("⚠️ Hatalı Email: Lütfen 'ornek@domain.com' formatında geçerli bir e-posta adresi giriniz.");
      return false;
    }
    if (!phoneRegex.test(manager.phone)) {
      alert("⚠️ Hatalı Telefon Numarası: Lütfen 10-15 basamaklı, opsiyonel '+' işareti ile başlayan bir numara giriniz.");
      return false;
    }
    if (!passwordRegex.test(manager.password)) {
      alert("⚠️ Geçersiz Şifre: Şifreniz en az 6 karakter içermelidir.");
      return false;
    }
    return true;
  };

  // 🔧 Manager ekleme fonksiyonu; POST isteği AuthController'daki register endpoint'ine role=manager şeklinde user bilgisi gönderir.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasyon kontrolü
    if (!validateForm()) {
      return; // Geçersizse form gönderilmez.
    }

    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        ...manager,
        role: "manager",
      });
      alert("✅ Manager başarıyla eklendi!");
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
      if (error.response && error.response.data) {
        alert(`❌ Manager eklenirken bir sorun oluştu: ${error.response.data}`);
      } else {
        alert("❌ Manager eklenemedi. Lütfen daha sonra tekrar deneyiniz.");
      }
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
      alert("❌ Kullanıcılar çekilirken bir hata oluştu (role=user).");
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
              hotelName: hotelData?.name || "Bilinmiyor",
              city: hotelData?.city || "Bilinmiyor"
            };
          } catch (error) {
            console.error(`Manager ${manager.userId} için otel bilgileri alınırken hata:`, error);
            return {
              ...manager,
              hotelName: "Bilinmiyor",
              city: "Bilinmiyor"
            };
          }
        })
      );
      setManagers(managersWithHotelInfo);
    } catch (error) {
      console.error("Error fetching managers:", error);
      alert("❌ Manager bilgileri çekilirken bir hata oluştu (role=manager).");
    }
  };

  // Mevcut deleteManager fonksiyonu, sadece manager listesi için çalışıyor.
  const deleteManager = async (managerToDelete) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${managerToDelete.userId}`);
      setManagers(managers.filter((m) => m.userId !== managerToDelete.userId));
      alert(`✅ ${managerToDelete.first_name} ${managerToDelete.last_name} başarıyla silindi!`);
    } catch (error) {
      console.error("Error deleting manager:", error);
      alert("❌ Manager silinirken bir hata oluştu. Lütfen tekrar deneyiniz.");
    }
  };

  // Kullanıcı listesi için delete fonksiyonu (role=user)
  const deleteUser = async (userToDelete) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${userToDelete.userId}`);
      setUsers(users.filter((u) => u.userId !== userToDelete.userId));
      alert(`✅ ${userToDelete.first_name} ${userToDelete.last_name} başarıyla silindi!`);
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("❌ Kullanıcı silinirken bir hata oluştu. Lütfen tekrar deneyiniz.");
    }
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
          pattern="^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$"
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
          pattern="^.{6,}$"
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
                {managers.map((m) => (
                  <tr key={m.userId}>
                    <td>{m.first_name}</td>
                    <td>{m.last_name}</td>
                    <td>{m.hotelName}</td>
                    <td>{m.city}</td>
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
          ) : (
            <p>No users found with role=user.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUser;
