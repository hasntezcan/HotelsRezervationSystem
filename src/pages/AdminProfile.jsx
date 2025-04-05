import React, { useState, useEffect } from "react";
import "../styles/AdminProfile.css";
import defaultAvatar from "../assets/images/avatar.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Component mount olduğunda, backend'deki admin profilini çekiyoruz.
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/auth/profile/admin")
      .then((response) => {
        const data = response.data;
        setAdmin({
          userId: data.userId,
          username: data.username,
          email: data.email,
          password: data.password,
          firstName: data.first_name,
          lastName: data.last_name,
          phone: data.phone,
          avatar: data.avatar || defaultAvatar,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching admin profile:", error);
        setLoading(false);
      });
  }, []);

  // Form alanları değiştiğinde state güncelleniyor.
  const handleInputChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  // "Save Changes" butonuna tıklandığında PUT isteği gönderiyoruz.
  const handleSaveChanges = async () => {
    try {
      const payload = {
        userId: admin.userId,
        username: admin.username,
        email: admin.email,
        password: admin.password, // Güncellenmiş şifre
        first_name: admin.firstName,
        last_name: admin.lastName,
        phone: admin.phone,
      };

      const response = await axios.put(
        "http://localhost:8080/api/auth/profile",
        payload
      );
      const updatedData = response.data;
      setAdmin({
        userId: updatedData.userId,
        username: updatedData.username,
        email: updatedData.email,
        password: updatedData.password,
        firstName: updatedData.first_name,
        lastName: updatedData.last_name,
        phone: updatedData.phone,
        avatar: updatedData.avatar || defaultAvatar,
      });
      alert("Profile updated successfully!");
    } catch (error) {
      alert(error.response ? error.response.data : error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!admin) return <p>No admin profile data available.</p>;

  return (
    <div className="admin-profile-page">
      <div className="admin-profile-container">
        <h2 className="admin-profile-title">Your Profile</h2>
        <div className="admin-profile-section">
          <img src={admin.avatar} alt="Profile" className="admin-profile-avatar" />
        </div>
        <div className="admin-profile-info">
          <div className="admin-profile-row">
            <div>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={admin.firstName || ""}
                onChange={handleInputChange}
                className="admin-profile-input"
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={admin.lastName || ""}
                onChange={handleInputChange}
                className="admin-profile-input"
              />
            </div>
          </div>
          <div className="admin-profile-row">
            <div>
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={admin.username || ""}
                onChange={handleInputChange}
                className="admin-profile-input"
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={admin.email || ""}
                onChange={handleInputChange}
                className="admin-profile-input"
              />
            </div>
          </div>
          <div className="admin-profile-password-wrapper">
            <label>Password</label>
            <div className="admin-profile-password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={admin.password || ""}
                onChange={handleInputChange}
                className="admin-profile-password-input"
              />
              <button
                type="button"
                className="admin-profile-show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </div>
        <button onClick={handleSaveChanges} className="admin-profile-button">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;
