import React, { useEffect, useState } from "react";
import SidebarAdmin from "../components/Sidebar_admin";
import AdminNavbar from "../components/AdminNavbar";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const ManagerStatus = () => {
  const [userCount, setUserCount] = useState(0);
  const [userRoleData, setUserRoleData] = useState([]);

  useEffect(() => {
    // Kullanıcı verilerini çek
    const users = JSON.parse(localStorage.getItem("localUsers")) || [];
    setUserCount(users.length);

    // Kullanıcı rolleri için veri gruplama
    const roleCounts = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});

    setUserRoleData([
      { name: "Admin", value: roleCounts["Admin"] || 0 },
      { name: "Manager", value: roleCounts["Manager"] || 0 },
      { name: "User", value: roleCounts["User"] || 0 }
    ]);
  }, []);

  const COLORS = ["#FF5733", "#28a745", "#007bff"];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar */}
      <AdminNavbar />

      <div style={{ display: "flex", flex: 1, marginTop: "60px" }}>
        {/* Sidebar */}
        <SidebarAdmin />

        {/* İçerik Alanı */}
        <div style={{ flex: 1, marginLeft: "250px", padding: "20px", width: "100%" }}>
          <Container>
            <Typography variant="h4" sx={{ my: 3, textAlign: "center" }}>Admin Paneli Durum</Typography>
            <Grid container spacing={3}>
              
              {/* Kullanıcı Sayısı */}
              <Grid item xs={12} md={6} lg={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Toplam Kullanıcı Sayısı</Typography>
                    <Typography variant="h4">{userCount}</Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Kullanıcı Rolleri Grafiği */}
              <Grid item xs={12} md={6} lg={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Kullanıcı Rolleri</Typography>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie data={userRoleData} dataKey="value" outerRadius={80} fill="#8884d8" label>
                          {userRoleData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>

            </Grid>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default ManagerStatus;
