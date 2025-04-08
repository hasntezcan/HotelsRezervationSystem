import React, { useState, useEffect } from 'react';
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
import SidebarManager from "../components/Sidebar_manager";
import axios from 'axios';

const ManagerProfile = () => {
  const [manager, setManager] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState({ phone: "" });

  // Manager ID'yi; bu örnekte sabit deger kullandık ama gerçek senaryoda oturumdaki manager verisinden alınabilir.
  const managerId = 2; 

  // Component mount olduğunda, backend'deki manager profilini çekiyoruz
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/auth/profile/manager?userId=${managerId}`)
      .then((response) => {
        const data = response.data;
        setManager({
          userId: data.userId,
          username: data.username,
          email: data.email,
          password: data.password,
          firstName: data.firstName || data.first_name,  // JSON dönüşümüne dikkat
          lastName: data.lastName || data.last_name,
          phone: data.phone,
          avatar: data.avatar || "https://www.w3schools.com/howto/img_avatar.png",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching manager profile:", error);
        setLoading(false);
      });
  }, [managerId]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validate phone format
    if (name === "phone") {
      const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/; // Format: (123) 456-7890
      setError({ ...error, phone: phoneRegex.test(value) ? "" : "Format: (123) 456-7890" });
    }

    setManager((prevManager) => ({
      ...prevManager,
      [name]: value,
    }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle profile save (güncelleme)
  const handleSaveChanges = async () => {
    if (isEditing && error.phone) return; // Hatalı phone formu varsa işlemi engelle
    try {
      const payload = {
        userId: manager.userId,
        username: manager.username,
        email: manager.email,
        password: manager.password,
        first_name: manager.firstName,
        last_name: manager.lastName,
        phone: manager.phone,
      };

      const response = await axios.put(
        "http://localhost:8080/api/auth/profile/manager",
        payload
      );

      const updatedData = response.data;
      setManager({
        userId: updatedData.userId,
        username: updatedData.username,
        email: updatedData.email,
        password: updatedData.password,
        firstName: updatedData.firstName || updatedData.first_name,
        lastName: updatedData.lastName || updatedData.last_name,
        phone: updatedData.phone,
        avatar: updatedData.avatar || manager.avatar,
      });
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      alert(error.response ? error.response.data : error.message);
    }
  };

  // Toggle between edit and view modes
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  if (loading) return <p>Loading...</p>;
  if (!manager) return <p>No manager profile data available.</p>;

  return (
    <div className="dashboard" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <SidebarManager />
      <div className="content" style={{ padding: '40px', width: '100%', maxWidth: '600px' }}>
        <Card style={{ width: '100%', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', textAlign: 'center', padding: '20px' }}>
          <CardContent>
            {/* Profile Icon */}
            <Box display="flex" flexDirection="column" alignItems="center">
              <img
                src={manager.avatar}
                alt="Profile"
                style={{ width: "100px", height: "100px", borderRadius: "50%", marginBottom: "15px" }}
              />
              <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                Your Profile
              </Typography>
            </Box>
            {/* Input Fields */}
            <Box display="flex" flexDirection="column" marginTop="20px">
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                disabled={!isEditing}
                value={manager.firstName || ""}
                name="firstName"
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                disabled={!isEditing}
                value={manager.lastName || ""}
                name="lastName"
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                disabled={!isEditing}
                value={manager.username || ""}
                name="username"
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                disabled={!isEditing}
                value={manager.email || ""}
                name="email"
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                disabled={!isEditing}
                value={manager.phone || ""}
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
                value={manager.password || ""}
                name="password"
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            {/* Edit/Save Button */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{
                marginTop: '20px',
                backgroundColor: error.phone ? "#d3d3d3" : "#E07A5F",
                color: "#ffffff",
                cursor: error.phone ? "not-allowed" : "pointer",
              }}
              onClick={isEditing ? handleSaveChanges : handleEditClick}
              disabled={!!error.phone}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManagerProfile;
