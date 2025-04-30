import React, { useState, useEffect } from "react";
import "../styles/AdminProfile.css";
import defaultAvatar from "../assets/images/avatar.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useTranslation } from "react-i18next";

const AdminProfile = () => {
  const { t } = useTranslation();
  const [admin, setAdmin] = useState({
    userId: null,
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    avatar: defaultAvatar,
    password: ""
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
          password: ""
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
        password: ""
      });
      alert(t("admin_profile.success"));
    } catch (error) {
      alert(
        error.response?.data || error.message || t("admin_profile.error")
      );
    }
  };

  if (loading) return <p>{t("admin_profile.loading")}</p>;
  if (!admin.userId) return <p>{t("admin_profile.no_data")}</p>;

  return (
    <div className="admin-profile-page">
      <div className="admin-profile-container">
        <h2 className="admin-profile-title">{t("admin_profile.title")}</h2>
        <div className="admin-profile-section">
          <img
            src={admin.avatar}
            alt="Profile"
            className="admin-profile-avatar"
          />
        </div>
        <div className="admin-profile-info">
          <div className="admin-profile-row">
            <div>
              <label>{t("admin_profile.first_name")}</label>
              <input
                type="text"
                name="firstName"
                value={admin.firstName}
                onChange={handleInputChange}
                className="admin-profile-input"
              />
            </div>
            <div>
              <label>{t("admin_profile.last_name")}</label>
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
              <label>{t("admin_profile.username")}</label>
              <input
                type="text"
                name="username"
                value={admin.username}
                onChange={handleInputChange}
                className="admin-profile-input"
              />
            </div>
            <div>
              <label>{t("admin_profile.email")}</label>
              <input
                type="email"
                name="email"
                value={admin.email}
                onChange={handleInputChange}
                className="admin-profile-input"
              />
            </div>
          </div>
          <div className="admin-profile-password-wrapper">
            <label>{t("admin_profile.new_password")}</label>
            <div className="admin-profile-password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder={t("admin_profile.password_placeholder")}
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
          {t("admin_profile.save_changes")}
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;
