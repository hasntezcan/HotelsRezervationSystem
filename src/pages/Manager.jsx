import React, { useState, useEffect, useContext } from "react";
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
  YAxis
} from "recharts";
import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

// Dashboard styling
const DashboardContainer = styled("div")({
  display: "flex",
  minHeight: "100vh",
});

const ContentContainer = styled("div")({
  flexGrow: 1,
  padding: "20px",
});

// Colors for the pie segments: pending, confirmed, rejected
const STATUS_COLORS = ["#FFBB28", "#00C49F", "#FF5733"];

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Manager dashboard component
const ManagerDashboard = () => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);

  const [managerId, setManagerId] = useState(null);

  // Dinamik veri
  const [revenueData, setRevenueData] = useState([]);
  const [reservationsStats, setReservationsStats] = useState([
    { name: t("manager.reservations.pending"), value: 0 },
    { name: t("manager.reservations.confirmed"), value: 0 },
    { name: t("manager.reservations.rejected"), value: 0 },
  ]);

  // 1) Manager ID'yi al
  useEffect(() => {
    if (!user?.userId) return;
    axios
      .get(`http://localhost:8080/api/auth/profile/manager?userId=${user.userId}`)
      .then(res => {
        if (res.data.managerId) {
          setManagerId(res.data.managerId);
        }
      })
      .catch(console.error);
  }, [user]);

  // 2) managerId değişince rezervasyonları çek, hem status dağılımı hem revenue hesapla
  useEffect(() => {
    if (!managerId) return;

    axios
      .get(`http://localhost:8080/api/bookings/manager-reservations?managerId=${managerId}`)
      .then(res => {
        const stats = { pending: 0, confirmed: 0, rejected: 0 };
        const revenueByMonth = {};

        res.data.forEach(b => {
          const status = b.status.toLowerCase();
          if (stats[status] !== undefined) stats[status]++;

          // check_in_date kullanarak ay-ay gelir hesapla
          const date = new Date(b.checkInDate);
          const key = `${date.getFullYear()}-${date.getMonth()}`; // örn "2025-3"
          revenueByMonth[key] = (revenueByMonth[key] || 0) + Number(b.totalPrice);
        });

        // Pie chart için değerleri ayarla
        setReservationsStats([
          { name: t("Pending"), value: stats.pending },
          { name: t("Confirmed"), value: stats.confirmed },
          { name: t("Rejected"), value: stats.rejected },
        ]);

        // Line chart için ay-ay veriyi diziye dönüştür ve sırala
        const revArray = Object.entries(revenueByMonth)
          .map(([key, val]) => {
            const [year, monthIndex] = key.split("-").map(Number);
            return {
              name: `${monthNames[monthIndex]} ${year}`,
              value: val
            };
          })
          .sort((a, b) => {
            const [mA, yA] = a.name.split(" ");
            const [mB, yB] = b.name.split(" ");
            const idxA = monthNames.indexOf(mA);
            const idxB = monthNames.indexOf(mB);
            if (yA !== yB) return yA - yB;
            return idxA - idxB;
          });

        setRevenueData(revArray);
      })
      .catch(console.error);
  }, [managerId, t]);

  return (
    <DashboardContainer>
      <SidebarManager />
      <ContentContainer className="content">
        <Container>
          <Grid container spacing={3}>
            {/* Revenue Generated */}
            <Grid item xs={12} md={12} lg={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Revenue Generated</Typography>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={revenueData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={val => `${val.toFixed(2)} ₺`} />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8884d8"
                        name="Revenue"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Reservations Status */}
            <Grid item xs={12} md={6} lg={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {t("manager.reservations.title", "Reservation Status")}
                  </Typography>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={reservationsStats}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={70}
                        label
                      >
                        {reservationsStats.map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={STATUS_COLORS[idx]} />
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
      </ContentContainer>
    </DashboardContainer>
  );
};

export default ManagerDashboard;