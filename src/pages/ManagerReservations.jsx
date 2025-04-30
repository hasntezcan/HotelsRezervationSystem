import React, { useState, useEffect, useContext } from "react";
import { Grid, Card, CardContent, Typography, Box, Button } from "@mui/material";
import { FaCheck, FaTimes } from "react-icons/fa";
import SidebarManager from "../components/Sidebar_manager";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";


// Tarih verisini "YYYY-MM-DD" formatına çevirmek için yardımcı fonksiyon.
const formatDate = (dateValue) => {
  if (!dateValue) return "";
  
  if (Array.isArray(dateValue)) {
    const [year, month, day] = dateValue;
    const m = month.toString().padStart(2, "0");
    const d = day.toString().padStart(2, "0");
    return `${year}-${m}-${d}`;
  }
  
  if (typeof dateValue === "string" && dateValue.length === 10) {
    return dateValue;
  }
  
  return dateValue.toString();
};

const ManagerReservations = () => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const [managerId, setManagerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);

  // Backend'den manager profilini çekip managerId'yi elde ediyoruz.
  const fetchManagerId = async () => {
    try {
      if (user && user.userId) {
        const response = await axios.get(
          `http://localhost:8080/api/auth/profile/manager?userId=${user.userId}`
        );
        if (response.data && response.data.managerId) {
          setManagerId(response.data.managerId);
        } else {
          console.error("Backend response did not contain managerId.");
        }
      }
    } catch (error) {
      console.error("Error fetching current manager profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      if (user.managerId) {
        setManagerId(user.managerId);
        setLoading(false);
      } else if (user.userId) {
        fetchManagerId();
      } else {
        setLoading(false);
        console.error("User information is not available.");
      }
    } else {
      setLoading(false);
      console.error("User information is not available.");
    }
  }, [user]);

  useEffect(() => {
    if (managerId) {
      fetchReservations();
    }
  }, [managerId]);

  // Backend'de manager'a ait rezervasyonları getiren endpoint.
  const fetchReservations = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/bookings/manager-reservations?managerId=${managerId}`
      );
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setLoading(false);
    }
  };

  // 1. Çözüm: Güncellemeden sonra tüm rezervasyonları yeniden fetch ediyoruz.
  const updateReservationStatus = async (bookingId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8080/api/bookings/${bookingId}/status?status=${newStatus}`
      );
      // Durum güncellendikten sonra verileri tekrar çekiyoruz.
      fetchReservations();
    } catch (error) {
      console.error(`Error updating reservation status to ${newStatus}:`, error);
    }
  };

  const handleConfirm = (bookingId) => {
    updateReservationStatus(bookingId, "confirmed");
  };

  const handleReject = (bookingId) => {
    updateReservationStatus(bookingId, "rejected");
  };

  if (loading) {
    return <Typography variant="body1">{t("manager_reservations.loading")}</Typography>;
  }

  if (!managerId) {
    return (
      <Typography variant="body1" color="error">
        {t("manager_reservations.no_manager")}
      </Typography>
    );
  }

  return (
    <div className="dashboard" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <SidebarManager />
      <div className="content" style={{ padding: "40px", width: "100%", maxWidth: "1200px" }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
        <Typography variant="h4" gutterBottom>
          {t("manager_reservations.title")}
        </Typography>
        <Typography variant="body1">{t("manager_reservations.user_id", { id: user.userId })}</Typography>
        <Typography variant="body1">{t("manager_reservations.manager_id", { id: managerId })}</Typography>
        </Box>
        <Grid container spacing={4}>
          {reservations && reservations.length > 0 ? (
            reservations.map((reservation, index) => (
              <Grid item xs={12} key={reservation.bookingId || index}>
                <Card style={{ borderRadius: "15px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", padding: "20px" }}>
                  <CardContent>
                    <Typography variant="h6">
                      {t("manager_reservations.booking_id")}: {reservation.bookingId}
                    </Typography>
                    <Typography variant="body2">
                    {t("manager_reservations.room_id")}: {reservation.roomId} - {reservation.roomName}
                    </Typography>
                    <Typography variant="body2">
                      {t("manager_reservations.checkin")}: {formatDate(reservation.checkInDate)}
                    </Typography>
                    <Typography variant="body2">
                      {t("manager_reservations.checkout")}: {formatDate(reservation.checkOutDate)}
                    </Typography>
                    <Typography variant="body2">
                      {t("manager_reservations.hotel_name")}: {reservation.hotelName}
                    </Typography>
                    <Typography variant="body2">
                      {t("manager_reservations.guests")}: {reservation.numGuests}
                    </Typography>
                    <Typography variant="body2">
                      {t("manager_reservations.total_price")}: {reservation.totalPrice}
                    </Typography>
                    <Typography variant="body2">
                      {t("manager_reservations.status")}: {reservation.status}
                    </Typography>

                    <Box display="flex" justifyContent="flex-start" mt={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<FaCheck />}
                        onClick={() => handleConfirm(reservation.bookingId)}
                        style={{ marginRight: "10px" }}
                      >
                        {t("manager_reservations.confirmed")}
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<FaTimes />}
                        onClick={() => handleReject(reservation.bookingId)}
                      >
                        {t("manager_reservations.rejected")}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" color="textSecondary">
                {t("manager_reservations.no_reservations")}
              </Typography>
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default ManagerReservations;
