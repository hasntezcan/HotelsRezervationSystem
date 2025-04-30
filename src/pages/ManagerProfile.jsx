import React, { useState, useEffect, useContext } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import SidebarManager from "../components/Sidebar_manager";
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';


const ManagerProfile = () => {
  const { user } = useContext(AuthContext);
  const { t } = useTranslation();

  const [managerData, setManagerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ phone: "" });

  useEffect(() => {
    if (!user?.userId) {
      setLoading(false);
      return;
    }
    axios
      .get(`http://localhost:8080/api/auth/profile/manager?userId=${user.userId}`)
      .then((response) => {
        const data = response.data;
        setManagerData({
          userId: data.user.userId,
          username: data.user.username,
          email: data.user.email,
          firstName: data.user.first_name || data.user.firstName,
          lastName: data.user.last_name || data.user.lastName,
          phone: data.user.phone,
          managerId: data.managerId,
          hotelId: data.hotelId,
          password: "" // do not expose hashed password
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching manager profile:", error);
        setLoading(false);
      });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
      setError((prev) => ({
        ...prev,
        phone: phoneRegex.test(value) ? "" : "Format: (123) 456-7890",
      }));
    }
    setManagerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    if (!managerData || error.phone) return;

    const payload = {
      userId: managerData.userId,
      username: managerData.username,
      email: managerData.email,
      first_name: managerData.firstName,
      last_name: managerData.lastName,
      phone: managerData.phone,
    };
    // include new password only if entered
    if (managerData.password.trim() !== "") {
      payload.password = managerData.password;
    }

    try {
      const response = await axios.put(
        "http://localhost:8080/api/auth/profile",
        payload
      );
      const updated = response.data;
      setManagerData({
        userId: updated.userId,
        username: updated.username,
        email: updated.email,
        firstName: updated.first_name,
        lastName: updated.last_name,
        phone: updated.phone,
        managerId: managerData.managerId,
        hotelId: managerData.hotelId,
        password: "" // reset password field after update
      });
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating manager profile:", err);
      alert(err.response?.data || err.message);
    }
  };

  if (loading) return <p>{t("common.loading")}</p>;
  if (!managerData) return <p>{t("manager_profile.no_data")}</p>;

  return (
    <div className="dashboard" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <SidebarManager />
      <div className="content" style={{ padding: '40px', width: '100%', maxWidth: '600px' }}>
        <Card style={{ width: '100%', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', textAlign: 'center', padding: '20px' }}>
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="center">
              <img
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt="Profile"
                style={{ width: "100px", height: "100px", borderRadius: "50%", marginBottom: "15px" }}
              />
              <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                {t("manager_profile.title")}
              </Typography>
              <Typography variant="subtitle1">
                Manager ID: {managerData.managerId} | User ID: {managerData.userId}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" marginTop="20px">
              <TextField
                label={t("manager_profile.first_name")}
                variant="outlined"
                fullWidth
                disabled={!isEditing}
                value={managerData.firstName || ""}
                name="firstName"
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label={t("manager_profile.last_name")}
                variant="outlined"
                fullWidth
                disabled={!isEditing}
                value={managerData.lastName || ""}
                name="lastName"
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label={t("manager_profile.username")}
                variant="outlined"
                fullWidth
                disabled={!isEditing}
                value={managerData.username || ""}
                name="username"
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label={t("manager_profile.email")}
                variant="outlined"
                fullWidth
                disabled={!isEditing}
                value={managerData.email || ""}
                name="email"
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label={t("manager_profile.phone")}
                variant="outlined"
                fullWidth
                disabled={!isEditing}
                value={managerData.phone || ""}
                name="phone"
                onChange={handleInputChange}
                error={!!error.phone}
                helperText={error.phone}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label={t("manager_profile.new_password")}
                variant="outlined"
                fullWidth
                disabled={!isEditing}
                type={showPassword ? "text" : "password"}
                value={managerData.password || ""}
                name="password"
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '20px', backgroundColor: "#E07A5F", color: "#ffffff" }}
              onClick={handleSaveChanges}
            >
              {t("manager_profile.save_changes")}
            </Button>
            <Button
              variant="outlined"
              fullWidth
              style={{ marginTop: '10px' }}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? t("common.cancel") : t("manager_profile.edit")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManagerProfile;
