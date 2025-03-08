import React, { useState } from 'react';
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

const ManagerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ phone: "" });
  const [manager, setManager] = useState({
    firstName: 'Johnatan',
    lastName: 'Smith',
    username: 'ManagerJohn',
    email: 'example@example.com',
    phone: '(097) 234-5678',
    password: 'password123',
  });

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

  // Handle profile save
  const handleEditClick = () => {
    if (isEditing && error.phone) return; // Prevent saving if phone is invalid
    setIsEditing(!isEditing);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="dashboard" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <SidebarManager />

      <div className="content" style={{ padding: '40px', width: '100%', maxWidth: '600px' }}>
        <Card
          style={{
            width: '100%',
            borderRadius: '15px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            padding: '20px',
          }}
        >
          <CardContent>
            {/* Profile Icon */}
            <Box display="flex" flexDirection="column" alignItems="center">
              <img
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt="Profile"
                style={{ width: "100px", height: "100px", borderRadius: "50%", marginBottom: "15px" }}
              />

              <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                Your Profile
              </Typography>
            </Box>

            {/* Input Fields (Responsive Layout) */}
            <Box display="flex" flexDirection="column" marginTop="20px">
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                disabled={!isEditing}
                value={manager.firstName}
                name="firstName"
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                disabled={!isEditing}
                value={manager.lastName}
                name="lastName"
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                disabled={!isEditing}
                value={manager.username}
                name="username"
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                disabled={!isEditing}
                value={manager.email}
                name="email"
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                disabled={!isEditing}
                value={manager.phone}
                name="phone"
                onChange={handleInputChange}
                error={!!error.phone}
                helperText={error.phone}
                style={{ marginBottom: '10px' }}
              />

              {/* Password Field with Visibility Toggle */}
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                disabled={!isEditing}
                type={showPassword ? "text" : "password"}
                value={manager.password}
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

            {/* Save Changes Button */}
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
              onClick={handleEditClick}
              disabled={!!error.phone} // Prevent saving if phone number is incorrect
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
