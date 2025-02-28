import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, CssBaseline, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// Menü içeriği
const menuItems = [
  { title: "Dashboard", content: "This is the dashboard content." },
  { title: "User Management", content: "Manage users, roles, and permissions here." },
  { title: "Reservations", content: "View and manage hotel reservations." },
  { title: "Settings", content: "Change system settings and configurations." },
];

const ManagerDashboard = () => {
  const [open, setOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(menuItems[0].content);

  const toggleDrawer = () => setOpen(!open);
  
  return (
    <>
      <CssBaseline />
      {/* Üst Menü (AppBar) */}
      <AppBar position="fixed" sx={{ zIndex: 1300 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={toggleDrawer} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Manager Dashboard</Typography>
        </Toolbar>
      </AppBar>

      {/* Kayarak Açılan Menü (Drawer) */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }}>
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index} onClick={() => { setSelectedContent(item.content); toggleDrawer(); }}>
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* İçerik Alanı */}
      <Box sx={{ marginTop: 10, padding: 3 }}>
        <Typography variant="h5">{selectedContent}</Typography>
      </Box>
    </>
  );
};

export default ManagerDashboard;
