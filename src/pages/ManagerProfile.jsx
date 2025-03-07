import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Box, TextField } from '@mui/material';
import SidebarManager from "../components/Sidebar_manager";

const ManagerProfile = () => {
  const [isEditing, setIsEditing] = useState(false); 
  const [manager, setManager] = useState({
    firstName: 'Johnatan',
    lastName: 'Smith',
    email: 'example@example.com',
    phone: '(097) 234-5678',
    hotelName: 'The Grand London Hotel',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setManager((prevManager) => ({
      ...prevManager,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="dashboard" style={{ display: 'flex' }}>
      {/* Sidebar: ManagerSideBar.css’deki responsive ayarlar geçerli */}
      <SidebarManager />

      {/* İçerik alanı: CSS’de tanımlı .content sınıfıyla margin-left otomatik ayarlanır */}
      <div className="content" style={{ padding: '40px', width: '100%' }}>
        <Card
          style={{
            width: '80%',
            maxWidth: '800px',
            margin: '0 auto',
            borderRadius: '15px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                {manager.firstName} {manager.lastName}
              </Typography>
              <Typography variant="h6" color="textSecondary" style={{ marginBottom: '20px' }}>
                {manager.hotelName}
              </Typography>

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
                style={{ marginBottom: '20px' }}
              />

              <Box display="flex" justifyContent="center" style={{ marginTop: '20px' }}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: '10px' }}
                  onClick={handleEditClick}
                >
                  {isEditing ? 'Save' : 'Edit Profile'}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManagerProfile;
