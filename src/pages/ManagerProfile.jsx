import React, { useState } from 'react'; // React import
import { Card, CardContent, Typography, Button, Box, TextField } from '@mui/material'; // Material-UI components
import SidebarManager from "../components/Sidebar_manager"; // Sidebar component for manager's page

const ManagerProfile = () => {
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
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

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <SidebarManager />

        {/* Profile Section */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '40px',
          }}
        >
          <Card
            style={{
              width: '80%',
              maxWidth: '800px',
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
