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
import { useTranslation } from "react-i18next";

// Dashboard styling
const DashboardContainer = styled("div")({
  display: "flex",
  minHeight: "100vh",
});

const ContentContainer = styled("div")({
  flexGrow: 1,
  padding: "20px",
});

// Manager dashboard component
const ManagerDashboard = () => {
  const { t } = useTranslation();

  const revenueData = [
    { name: "May", value: 150 },
    { name: "June", value: 200 },
    { name: "July", value: 300 },
    { name: "August", value: 250 },
    { name: "Sept", value: 400 },
    { name: "Oct", value: 350 },
  ];

  const reservationsData = [
    { name: t("manager.reservations.approved"), value: 70 },
    { name: t("manager.reservations.rejected"), value: 30 },
  ];

  const ratingsData = [
    { month: "May", rating: 4 },
    { month: "June", rating: 3 },
    { month: "July", rating: 5 },
    { month: "August", rating: 2 },
    { month: "Sept", rating: 4 },
    { month: "Oct", rating: 3 },
  ];

  return (
    <DashboardContainer>
      <SidebarManager />
      <ContentContainer className="content">
        <Container>
          <Grid container spacing={3}>
            {/* Revenue */}
            <Grid item xs={12} md={12} lg={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {t("manager.revenue")}
                  </Typography>
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

            {/* Reservations */}
            <Grid item xs={12} md={6} lg={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {t("manager.reservations.title")}
                  </Typography>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie
                        data={reservationsData}
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

            {/* Ratings */}
            <Grid item xs={12} md={12} lg={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {t("manager.ratings")}
                  </Typography>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={ratingsData}>
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
                      <Tooltip />
                      <Bar dataKey="rating" fill="#8884d8" />
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
