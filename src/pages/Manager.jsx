import React from "react";
import SidebarManager from "../components/Sidebar_manager";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  BarChart,
  Bar
} from "recharts";
import { styled } from "@mui/system";

// Genel dashboard container: Sidebar ve içerik alanını yan yana yerleştirir.
const DashboardContainer = styled("div")({
  display: "flex",
  minHeight: "100vh",
});

// İçerik alanı: SidebarManager.css'deki .content sınıfındaki margin-left ayarları uygulanacak.
const ContentContainer = styled("div")({
  flexGrow: 1,
  padding: "20px",
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
    <DashboardContainer>
      {/* SidebarManager bileşeni, ManagerSideBar.css'de tanımlı responsive ayarlarla çalışacaktır */}
      <SidebarManager />

      {/* İçerik alanı; CSS üzerinden margin-left: 260px veya 70px, sidebar durumuna göre ayarlanır */}
      <ContentContainer className="content">
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
                      <Pie
                        data={campaignData}
                        dataKey="value"
                        outerRadius={70}
                        fill="#8884d8"
                        label
                      >
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
      </ContentContainer>
    </DashboardContainer>
  );
};

export default ManagerDashboard;
