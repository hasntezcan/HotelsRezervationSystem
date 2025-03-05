import React from "react";
import SidebarManager from "../components/Sidebar_manager";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, BarChart, Bar } from "recharts";
import { styled } from "@mui/system";

// Styled components with inline media queries
const DashboardContainer = styled('div')({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const DashboardContent = styled('div')({
  display: "flex",
  flex: 1,
  marginTop: "60px",
});

const DashboardMain = styled('div')({
  flex: 1,
  marginLeft: "250px",
  padding: "20px",
  width: "100%",
  "@media (max-width: 1024px)": {
    marginLeft: 0, // Remove left margin on medium-sized screens
    padding: "10px", // Adjust padding for smaller screens
  },
  "@media (max-width: 768px)": {
    marginLeft: 0, // Full-width content for smaller screens
    padding: "10px", // Adjust padding
  },
  "@media (max-width: 480px)": {
    padding: "5px", // Even smaller padding for very small screens
  },
});

const SidebarManagerStyled = styled(SidebarManager)({
  "@media (max-width: 768px)": {
    display: "none", // Hide the sidebar on mobile devices
  },
});

const ManagerDashboard = () => {
  const revenueData = [
    { name: "May", value: 150 },
    { name: "June", value: 200 },
    { name: "July", value: 300 },
    { name: "August", value: 250 },
    { name: "Sept", value: 400 },
    { name: "Oct", value: 350 },
  ];

  const campaignData = [
    { name: "Success", value: 70 },
    { name: "Failure", value: 30 },
  ];

  const resData = [
    { name: "PARIS", uv: 400, pv: 240, amt: 240 },
    { name: "LONDON", uv: 300, pv: 180, amt: 220 },
    { name: "BALI", uv: 500, pv: 320, amt: 260 },
    { name: "TOKYO", uv: 400, pv: 250, amt: 280 },
  ];

  return (
      <DashboardContent>
        <SidebarManagerStyled />
        <DashboardMain>
          <Container>
            <Grid container spacing={3}>
              {/* Revenue Generated */}
              <Grid item xs={12} md={12} lg={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Revenue Generated</Typography>
                    <ResponsiveContainer width="100%" height={180}>
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
                    <ResponsiveContainer width="100%" height={180}>
                      <PieChart>
                        <Pie data={campaignData} dataKey="value" outerRadius={70} fill="#8884d8" label>
                          <Cell fill="#00C49F" />
                          <Cell fill="#FF5733" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
              {/* Reservations */}
              <Grid item xs={12} md={12} lg={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Reservations</Typography>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={resData}>
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
        </DashboardMain>
      </DashboardContent>
  );
};

export default ManagerDashboard;
