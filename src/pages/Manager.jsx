import React from "react";
import SidebarManager from "../components/Sidebar_manager";
import ManagerNavbar from "../components/ManagerNavbar";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, BarChart, Bar } from "recharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ManagerDashboard = () => {
  const revenueData = [
    { name: "plane", value: 150 },
    { name: "helicopter", value: 200 },
    { name: "boat", value: 300 },
    { name: "train", value: 250 },
    { name: "bus", value: 400 },
    { name: "car", value: 350 },
  ];

  const campaignData = [
    { name: "Success", value: 70 },
    { name: "Failure", value: 30 },
  ];

  const salesData = [
    { name: "AD", uv: 400, pv: 240, amt: 240 },
    { name: "AE", uv: 300, pv: 180, amt: 220 },
    { name: "AF", uv: 500, pv: 320, amt: 260 },
    { name: "AG", uv: 400, pv: 250, amt: 280 },
    { name: "AL", uv: 600, pv: 400, amt: 300 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <ManagerNavbar />
      <div style={{ display: "flex", flex: 1, marginTop: "60px" }}>
        <SidebarManager />
        <div style={{ flex: 1, marginLeft: "250px", padding: "20px", width: "100%" }}>
          <Container>
            <Grid container spacing={3}>
              {/* Revenue Generated */}
              <Grid item xs={12} md={12} lg={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Revenue Generated</Typography>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={revenueData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
              {/* Campaign */}
              <Grid item xs={12} md={6} lg={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Campaign</Typography>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie data={campaignData} dataKey="value" outerRadius={80} fill="#8884d8" label>
                          <Cell fill="#00C49F" />
                          <Cell fill="#FF5733" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
              {/* Sales Quantity */}
              <Grid item xs={12} md={12} lg={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Sales Quantity</Typography>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={salesData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="uv" fill="#82ca9d" />
                        <Bar dataKey="pv" fill="#8884d8" />
                      </BarChart>
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

export default ManagerDashboard;
