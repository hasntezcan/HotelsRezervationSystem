import React, { useState, useEffect, useContext } from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import SidebarManager from "../components/Sidebar_manager";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

// Tarih verisini "YYYY-MM-DD" formatına çevirmek için yardımcı fonksiyon.
const formatDate = (dateValue) => {
  if (!dateValue) return "";
  
  // Eğer tarih bir dizi olarak gelmişse (ör: [2025, 4, 11])
  if (Array.isArray(dateValue)) {
    const [year, month, day] = dateValue;
    // Ay ve günü 2 hane olacak şekilde dolduralım
    const m = month.toString().padStart(2, "0");
    const d = day.toString().padStart(2, "0");
    return `${year}-${m}-${d}`;
  }
  
  // Eğer tarih string ise ve format zaten "yyyy-mm-dd" ise direk döndür.
  if (typeof dateValue === "string" && dateValue.length === 10) {
    return dateValue;
  }
  
  // Diğer durumlarda, tarih değerini doğrudan string'e çevirir.
  return dateValue.toString();
};

const ManagerReservations = () => {
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
  // Bu endpoint ManagerReservationDTO nesnelerini döndürmekte.
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

  if (loading) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  if (!managerId) {
    return (
      <Typography variant="body1" color="error">
        Manager ID is not available. Please ensure you have manager access.
      </Typography>
    );
  }

  return (
    <div className="dashboard" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <SidebarManager />
      <div className="content" style={{ padding: "40px", width: "100%", maxWidth: "1200px" }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
          <Typography variant="h4" gutterBottom>
            Manager Reservations
          </Typography>
          <Typography variant="body1">User ID: {user.userId}</Typography>
          <Typography variant="body1">Manager ID: {managerId}</Typography>
        </Box>
        <Grid container spacing={4}>
          {reservations && reservations.length > 0 ? (
            reservations.map((reservation, index) => (
              <Grid item xs={12} key={reservation.bookingId || index}>
                <Card style={{ borderRadius: "15px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", padding: "20px" }}>
                  <CardContent>
                    <Typography variant="h6">
                      Booking ID: {reservation.bookingId}
                    </Typography>
                    <Typography variant="body2">
                      Room ID: {reservation.roomId} - {reservation.roomName}
                    </Typography>
                    <Typography variant="body2">
                      Check-in Date: {formatDate(reservation.checkInDate)}
                    </Typography>
                    <Typography variant="body2">
                      Check-out Date: {formatDate(reservation.checkOutDate)}
                    </Typography>
                    <Typography variant="body2">
                      Hotel Name: {reservation.hotelName}
                    </Typography>
                    <Typography variant="body2">
                      Number of Guests: {reservation.numGuests}
                    </Typography>
                    <Typography variant="body2">
                      Total Price: {reservation.totalPrice}
                    </Typography>
                    <Typography variant="body2">
                      Status: {reservation.status}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" color="textSecondary">
                No reservations found.
              </Typography>
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default ManagerReservations;
