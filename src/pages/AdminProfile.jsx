import React, { useState, useEffect } from "react";
import "../styles/AdminProfile.css";
import defaultAvatar from "../assets/images/avatar.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const AdminProfile = () => {
  const [admin, setAdmin] = useState({
    userId: null,
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    avatar: defaultAvatar,
    password: "" // for new password entry only
  });
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/auth/profile/admin")
      .then((response) => {
        const data = response.data;
        setAdmin((prev) => ({
          ...prev,
          userId: data.userId,
          username: data.username,
          email: data.email,
          firstName: data.first_name,
          lastName: data.last_name,
          phone: data.phone,
          avatar: data.avatar || defaultAvatar,
          password: "" // do not expose hashed password
        }));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching admin profile:", error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      // Build payload; include password only if a new one was entered
      const payload = {
        userId: admin.userId,
        username: admin.username,
        email: admin.email,
        first_name: admin.firstName,
        last_name: admin.lastName,
        phone: admin.phone
      };
      if (admin.password && admin.password.trim() !== "") {
        payload.password = admin.password;
      }

      const response = await axios.put(
        "http://localhost:8080/api/auth/profile",
        payload
      );
      const updated = response.data;
      setAdmin({
        userId: updated.userId,
        username: updated.username,
        email: updated.email,
        firstName: updated.first_name,
        lastName: updated.last_name,
        phone: updated.phone,
        avatar: updated.avatar || defaultAvatar,
        password: "" // reset password field
      });
      alert("Profile updated successfully!");
    } catch (error) {
      alert(
        error.response?.data || error.message || "Error updating profile"
      );
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!admin.userId) return <p>No admin profile data available.</p>;

  return (
    <div className="admin-profile-page">
      <div className="admin-profile-container">
        <h2 className="admin-profile-title">Your Profile</h2>
        <div className="admin-profile-section">
          <img
            src={admin.avatar}
            alt="Profile"
            className="admin-profile-avatar"
          />
        </div>
        <div className="admin-profile-info">
          {/* Name and username/email rows */}
          <div className="admin-profile-row">
            <div>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={admin.firstName}
                onChange={handleInputChange}
                className="admin-profile-input"
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={admin.lastName}
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
                value={admin.username}
                onChange={handleInputChange}
                className="admin-profile-input"
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={admin.email}
                onChange={handleInputChange}
                className="admin-profile-input"
              />
            </div>
          </div>

          {/* Password field for new password only */}
          <div className="admin-profile-password-wrapper">
            <label>New Password (leave blank to keep current)</label>
            <div className="admin-profile-password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter new password"
                value={admin.password}
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
        <button
          onClick={handleSaveChanges}
          className="admin-profile-button"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;
