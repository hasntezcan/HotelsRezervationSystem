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

const ManagerProfile = () => {
  const { user } = useContext(AuthContext); // Login olmuş kullanıcı (user nesnesi)
  const [managerData, setManagerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ phone: "" });

  useEffect(() => {
    if (!user || !user.userId) {
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
          password: data.user.password,
          firstName: data.user.first_name || data.user.firstName,
          lastName: data.user.last_name || data.user.lastName,
          phone: data.user.phone,
          managerId: data.managerId,
          hotelId: data.hotelId,
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
      setError((prevError) => ({
        ...prevError,
        phone: phoneRegex.test(value) ? "" : "Format: (123) 456-7890",
      }));
    }
    setManagerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    if (!managerData) return;
    if (error.phone) return;

    const payload = {
      userId: managerData.userId,
      username: managerData.username,
      email: managerData.email,
      password: managerData.password,
      first_name: managerData.firstName,
      last_name: managerData.lastName,
      phone: managerData.phone,
    };

    try {
      const response = await axios.put(
        "http://localhost:8080/api/auth/profile",
        payload
      );
      const updatedData = response.data;
      setManagerData({
        userId: updatedData.userId,
        username: updatedData.username,
        email: updatedData.email,
        password: updatedData.password,
        firstName: updatedData.first_name,
        lastName: updatedData.last_name,
        phone: updatedData.phone,
        managerId: managerData.managerId, // ManagerID ve hotelID sabit kalır
        hotelId: managerData.hotelId,
      });
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating manager profile:", error);
      alert(error.response ? error.response.data : error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!managerData) return <p>No manager profile data available.</p>;

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
                Your Profile
              </Typography>
              <Typography variant="subtitle1">
                Manager ID: {managerData.managerId} | User ID: {managerData.userId}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" marginTop="20px">
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                disabled={!isEditing}
                value={managerData.firstName || ""}
                name="firstName"
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                disabled={!isEditing}
                value={managerData.lastName || ""}
                name="lastName"
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                disabled={!isEditing}
                value={managerData.username || ""}
                name="username"
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                disabled={!isEditing}
                value={managerData.email || ""}
                name="email"
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label="Phone"
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
                label="Password"
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
              Save Changes
            </Button>
            <Button
              variant="outlined"
              fullWidth
              style={{ marginTop: '10px' }}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManagerProfile;
