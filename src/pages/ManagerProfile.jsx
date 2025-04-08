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
import axios from 'axios';
import SidebarManager from "../components/Sidebar_manager";

const ManagerProfile = () => {
  const [manager, setManager] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ phone: "" });

  // Manager profilini backend'den çekiyoruz.
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/auth/profile/manager")
      .then((response) => {
        const data = response.data;
        // Backend'den gelen alan adlarının isimlerine dikkat edin. Örneğin, first_name yerine firstName dönüyorsa,
        // buna göre state güncellemesi yapın.
        setManager({
          userId: data.userId,
          username: data.username,
          email: data.email,
          password: data.password,
          firstName: data.first_name, // veya data.firstName
          lastName: data.last_name,   // veya data.lastName
          phone: data.phone,
          // Eğer avatar alanı varsa ekleyebilirsiniz
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching manager profile:", error);
        setLoading(false);
      });
  }, []);

  // Input değişikliklerini state'e yansıtıyoruz.
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Telefon numarası formatı kontrolü
    if (name === "phone") {
      const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/; // Format: (123) 456-7890
      setError((prevError) => ({
        ...prevError,
        phone: phoneRegex.test(value) ? "" : "Format: (123) 456-7890",
      }));
    }
    setManager((prevManager) => ({
      ...prevManager,
      [name]: value,
    }));
  };

  // "Save Changes" butonuna tıklandığında çalışan fonksiyon.
  const handleSaveChanges = async () => {
    if (!manager) return;
    if (error.phone) return; // Geçersiz telefon varsa gönderme

    // Düzenlenmiş veriler
    const payload = {
      userId: manager.userId,
      username: manager.username,
      email: manager.email,
      password: manager.password,
      first_name: manager.firstName,
      last_name: manager.lastName,
      phone: manager.phone,
    };

    try {
      const response = await axios.put(
        "http://localhost:8080/api/auth/profile",
        payload
      );
      // Güncellemeden dönen veriyi state'e yansıtıyoruz.
      const updatedData = response.data;
      setManager({
        userId: updatedData.userId,
        username: updatedData.username,
        email: updatedData.email,
        password: updatedData.password,
        firstName: updatedData.first_name,
        lastName: updatedData.last_name,
        phone: updatedData.phone,
      });
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating manager profile:", error);
      alert(error.response ? error.response.data : error.message);
    }
  };

  // Eğer manager verisi yüklenmemişse
  if (loading) return <p>Loading...</p>;
  if (!manager) return <p>No manager profile data available.</p>;

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
              style={{
                marginTop: '20px',
                backgroundColor: "#E07A5F",
                color: "#ffffff",
              }}
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
