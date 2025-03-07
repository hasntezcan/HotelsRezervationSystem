import React, { useState } from "react";
import "../styles/AdminProfile.css";
import defaultAvatar from "../assets/images/avatar.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminProfile = () => {
  const [admin, setAdmin] = useState({
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    email: "admin@example.com",
    password: "********",
    avatar: defaultAvatar,
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword && newPassword !== "") {
      alert("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      alert("Passwords do not match!");
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdmin((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = () => {
    alert("Profile updated successfully!");
  };

  return (
    <div className="admin-profile-page">
      <div className="admin-profile-container">
        <h2 className="admin-profile-title">Your Profile</h2>
        <div className="admin-profile-section">
          <img src={admin.avatar} alt="Profile" className="admin-profile-avatar" />
          <input type="file" accept="image/*" onChange={handleAvatarChange} className="admin-profile-input-file" />
        </div>
        <div className="admin-profile-info">
          <div className="admin-profile-row">
            <div>
              <label>First Name</label>
              <input type="text" name="firstName" value={admin.firstName} onChange={handleInputChange} className="admin-profile-input" />
            </div>
            <div>
              <label>Last Name</label>
              <input type="text" name="lastName" value={admin.lastName} onChange={handleInputChange} className="admin-profile-input" />
            </div>
          </div>
          <div className="admin-profile-row">
            <div>
              <label>Username</label>
              <input type="text" name="username" value={admin.username} onChange={handleInputChange} className="admin-profile-input" />
            </div>
            <div>
              <label>Email</label>
              <input type="email" name="email" value={admin.email} onChange={handleInputChange} className="admin-profile-input" />
            </div>
          </div>
          <div className="admin-profile-password-wrapper">
            <label>Password</label>
            <div className="admin-profile-password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={admin.password}
                className="admin-profile-password-input"
                readOnly
              />
              <button type="button" className="admin-profile-show-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </div>
        <button onClick={handleSaveChanges} className="admin-profile-button">Save Changes</button>
        <div className="admin-profile-password-section">
          <h3 className="admin-profile-password-title">Change Password</h3>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="admin-profile-password-input"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="admin-profile-password-input"
          />
          <button onClick={handlePasswordChange} className="admin-profile-button">Update Password</button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
