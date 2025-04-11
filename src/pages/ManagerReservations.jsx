import React, { useState, useEffect, useContext } from "react";
import { Grid, Card, CardContent, Typography, Box, Button } from "@mui/material";
import { FaCheck, FaTimes } from "react-icons/fa";
import SidebarManager from "../components/Sidebar_manager";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ManagerReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext); // Giriş yapmış kullanıcının bilgisi
  const [managerId, setManagerId] = useState(null);

  // Eğer AuthContext içindeki user.managerId yoksa, backend'den manager profilini çekip managerId'yi elde ediyoruz.
  const fetchManagerId = async () => {
    try {
      if (user && user.userId) {
        const response = await axios.get(`http://localhost:8080/api/auth/profile/manager?userId=${user.userId}`);
        // Backend'den dönen yanıtın managerId'si
        const mgrId = response.data.managerId;
        setManagerId(mgrId);
      }
    } catch (error) {
      console.error("Error fetching current manager profile:", error);
    }
  };

  useEffect(() => {
    // İlk önce managerId'yi AuthContext üzerinden kontrol ediyoruz.
    if (user && user.managerId) {
      setManagerId(user.managerId);
    } else if (user && user.userId) {
      // Eğer managerId AuthContext içerisinde yoksa, manager profilini çekiyoruz.
      fetchManagerId();
    } else {
      setLoading(false);
      console.error("User information is not available.");
    }
  }, [user]);

  useEffect(() => {
    if (managerId) {
      fetchReservations();
    } else {
      // Eğer managerId hala null ise, loading sonlandırıyoruz.
      setLoading(false);
      console.error("Manager ID is not available.");
    }
  }, [managerId]);

  // Backend’de manager'a ait rezervasyonları getiren endpoint
  const fetchReservations = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/reservations/manager?managerId=${managerId}`
      );
      setReservations(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      setLoading(false);
    }
  };

  const handleApprove = (reservationId) => {
    const updatedReservations = reservations.map((reservation) =>
      reservation.booking_id === reservationId ? { ...reservation, status: "Approved" } : reservation
    );
    setReservations(updatedReservations);
    // Ek API çağrısı ekleyerek backend'deki statü güncellemesini de gerçekleştirebilirsiniz.
  };

  const handleReject = (reservationId) => {
    const updatedReservations = reservations.map((reservation) =>
      reservation.booking_id === reservationId ? { ...reservation, status: "Rejected" } : reservation
    );
    setReservations(updatedReservations);
    // Ek API çağrısı ile durumu güncelleyebilirsiniz.
  };

  return (
    <div className="dashboard" style={{ display: "flex" }}>
      <SidebarManager />
      <div className="content" style={{ padding: "40px", width: "100%" }}>
        <Grid container spacing={4} style={{ width: "100%", maxWidth: "1400px" }}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Reservation Management
            </Typography>
            {loading ? (
              <Typography variant="body1">Loading reservations...</Typography>
            ) : reservations && reservations.length > 0 ? (
              reservations.map((reservation) => (
                <Card
                  key={reservation.booking_id}
                  style={{
                    borderRadius: "15px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    marginBottom: "20px",
                    padding: "20px",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">
                      {reservation.hotelName || "Hotel Name"}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Check-in Date:</strong> {reservation.check_in_date}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Check-out Date:</strong> {reservation.check_out_date}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Status:</strong> {reservation.status || "Pending"}
                    </Typography>
                    <Box display="flex" justifyContent="flex-start" mt={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<FaCheck />}
                        onClick={() => handleApprove(reservation.booking_id)}
                        style={{ marginRight: "10px" }}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<FaTimes />}
                        onClick={() => handleReject(reservation.booking_id)}
                      >
                        Reject
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="h6" color="textSecondary">
                No reservations found.
              </Typography>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ManagerReservations;
